export interface DramaMaster {
  id: number
  title: string
  slug: string
  year: number
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  broadcaster: string
  timeslot: string
  airDay: string
  genre: string
  status: 'airing' | 'completed' | 'upcoming'
  airStart: string
  airEnd: string
  synopsis: string
  cast: string[]
}

export interface ArchiveSummary {
  year: number
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  dramaCount: number
  avgBakaLevel: number
  topDramas: string[]
  summary: string
  idRangeStart: number
  idRangeEnd: number
}

// CSV文字列をパースする関数
export function parseDramasCSV(csvContent: string): DramaMaster[] {
  const lines = csvContent.trim().split('\n')
  const headers = lines[0].split(',')
  
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line)
    const drama: Partial<DramaMaster> = {}
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim()
      
      switch (header) {
        case 'id':
          drama.id = parseInt(value)
          break
        case 'year':
          drama.year = parseInt(value)
          break
        case 'cast':
          drama.cast = value.split(',').map(c => c.trim())
          break
        case 'season':
          drama.season = value as 'spring' | 'summer' | 'autumn' | 'winter'
          break
        case 'status':
          drama.status = value as 'airing' | 'completed' | 'upcoming'
          break
        default:
          (drama as Record<string, string>)[header] = value
      }
    })
    
    return drama as DramaMaster
  })
}

export function parseArchivesCSV(csvContent: string): ArchiveSummary[] {
  const lines = csvContent.trim().split('\n')
  const headers = lines[0].split(',')
  
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line)
    const archive: Partial<ArchiveSummary> = {}
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim()
      
      switch (header) {
        case 'year':
        case 'drama_count':
        case 'id_range_start':
        case 'id_range_end':
          (archive as Record<string, number>)[toCamelCase(header)] = parseInt(value)
          break
        case 'avg_baka_level':
          archive.avgBakaLevel = parseFloat(value)
          break
        case 'top_dramas':
          archive.topDramas = value.split(',').map(d => d.trim())
          break
        case 'season':
          archive.season = value as 'spring' | 'summer' | 'autumn' | 'winter'
          break
        default:
          (archive as Record<string, string>)[toCamelCase(header)] = value
      }
    })
    
    return archive as ArchiveSummary
  })
}

// CSV行をパースする（カンマ区切り対応）
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current.trim())
  return result
}

// snake_case を camelCase に変換
function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

// ドラマIDからドラマ情報を取得
export function getDramaById(dramas: DramaMaster[], id: number): DramaMaster | undefined {
  return dramas.find(drama => drama.id === id)
}

// 年度・季節からドラマリストを取得
export function getDramasBySeason(dramas: DramaMaster[], year: number, season: string): DramaMaster[] {
  return dramas.filter(drama => drama.year === year && drama.season === season)
}

// 現在放送中のドラマを取得
export function getCurrentDramas(dramas: DramaMaster[]): DramaMaster[] {
  return dramas.filter(drama => drama.status === 'airing')
}