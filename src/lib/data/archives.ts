import { parseArchivesCSV, parseDramasCSV, ArchiveSummary, DramaMaster } from './csv-parser'
import { promises as fs } from 'fs'
import path from 'path'

// アーカイブデータの型定義
export interface SeasonArchive {
  year: number
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  seasonDisplay: string
  dramaCount: number
  avgBakaLevel: number
  topDramas: string[]
  summary: string
  idRangeStart?: number
  idRangeEnd?: number
}

export interface YearlyArchive {
  year: number
  seasons: SeasonArchive[]
  totalDramas: number
  highlights: string[]
}

// CSVからアーカイブデータを読み込む
export async function loadArchiveData(): Promise<YearlyArchive[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/lib/data/archives_summary.csv')
    const csvContent = await fs.readFile(filePath, 'utf8')
    const summaries = parseArchivesCSV(csvContent)
    
    // 年度別にグループ化
    const yearMap = new Map<number, ArchiveSummary[]>()
    summaries.forEach(summary => {
      if (!yearMap.has(summary.year)) {
        yearMap.set(summary.year, [])
      }
      yearMap.get(summary.year)!.push(summary)
    })
    
    // YearlyArchive形式に変換
    const yearlyArchives: YearlyArchive[] = []
    yearMap.forEach((seasons, year) => {
      const totalDramas = seasons.reduce((sum, season) => sum + season.dramaCount, 0)
      const highlights = seasons.flatMap(season => season.topDramas).slice(0, 3)
      
      const yearlyArchive: YearlyArchive = {
        year,
        totalDramas,
        highlights,
        seasons: seasons.map(season => ({
          year: season.year,
          season: season.season,
          seasonDisplay: getSeasonDisplay(season.season),
          dramaCount: season.dramaCount,
          avgBakaLevel: season.avgBakaLevel,
          topDramas: season.topDramas,
          summary: season.summary,
          idRangeStart: season.idRangeStart,
          idRangeEnd: season.idRangeEnd
        })).sort((a, b) => {
          // 季節順でソート（秋→夏→春→冬）
          const seasonOrder = { autumn: 0, summer: 1, spring: 2, winter: 3 }
          return seasonOrder[a.season] - seasonOrder[b.season]
        })
      }
      
      yearlyArchives.push(yearlyArchive)
    })
    
    // 年度降順でソート
    return yearlyArchives.sort((a, b) => b.year - a.year)
    
  } catch (error) {
    console.error('Error loading archive data:', error)
    return []
  }
}

// 現在シーズンのドラマデータを読み込む
export async function loadCurrentSeasonDramas(): Promise<DramaMaster[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/lib/data/dramas_master.csv')
    const csvContent = await fs.readFile(filePath, 'utf8')
    const dramas = parseDramasCSV(csvContent)
    
    // 現在のシーズン（2025年冬）のドラマのみフィルター
    return dramas.filter(drama => 
      drama.year === 2025 && 
      drama.season === 'winter' && 
      drama.status === 'airing'
    )
  } catch (error) {
    console.error('Error loading current season dramas:', error)
    return []
  }
}

// 特定の年・季節のドラマデータを取得
export async function getDramasBySeason(year: number, season: string): Promise<DramaMaster[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/lib/data/dramas_master.csv')
    const csvContent = await fs.readFile(filePath, 'utf8')
    const dramas = parseDramasCSV(csvContent)
    
    return dramas.filter(drama => 
      drama.year === year && 
      drama.season === season
    )
  } catch (error) {
    console.error('Error loading season dramas:', error)
    return []
  }
}

// 季節名の日本語表示を取得
function getSeasonDisplay(season: string): string {
  const seasonMap: Record<string, string> = {
    spring: '春',
    summer: '夏',
    autumn: '秋',
    winter: '冬'
  }
  return seasonMap[season] || season
}

// 曜日別にドラマをグループ化
export function groupDramasByDay(dramas: DramaMaster[]): Record<string, DramaMaster[]> {
  const dayGroups: Record<string, DramaMaster[]> = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  }
  
  dramas.forEach(drama => {
    if (dayGroups[drama.airDay]) {
      dayGroups[drama.airDay].push(drama)
    }
  })
  
  return dayGroups
}

// 曜日名の日本語マッピング
export const DAY_DISPLAY_MAP: Record<string, string> = {
  monday: '月',
  tuesday: '火',
  wednesday: '水',
  thursday: '木',
  friday: '金',
  saturday: '土',
  sunday: '日'
}