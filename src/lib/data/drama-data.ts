import fs from 'fs'
import path from 'path'
import { parseDramasCSV, getCurrentDramasByDay, DAY_NAMES, DramaMaster } from './csv-parser'

// CSVファイルを読み込んでパースする関数
export function loadDramasFromCSV(): DramaMaster[] {
  try {
    const csvPath = path.join(process.cwd(), 'src/lib/data/dramas_master.csv')
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    return parseDramasCSV(csvContent)
  } catch (error) {
    console.error('Error loading dramas from CSV:', error)
    return []
  }
}

// 放送中ドラマを曜日別に取得する関数
export function getWeeklyDramasFromCSV(): Record<string, DramaMaster[]> {
  const allDramas = loadDramasFromCSV()
  return getCurrentDramasByDay(allDramas)
}

// 曜日名マッピングをエクスポート
export { DAY_NAMES }