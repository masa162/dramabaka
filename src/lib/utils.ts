import { Drama, Review, BakaLevelInfo } from './types'
import { BAKA_LEVELS } from './constants'

// バカ度レベル情報を取得
export function getBakaLevelInfo(level: 1 | 2 | 3 | 4 | 5): BakaLevelInfo {
  return BAKA_LEVELS[level]
}

// バカ度を星マークで表示
export function formatBakaLevel(level: 1 | 2 | 3 | 4 | 5): string {
  const info = getBakaLevelInfo(level)
  return `${info.stars}(${info.label})`
}

// ドラマのスラッグからIDを取得
export function getDramaBySlug(dramas: Drama[], slug: string): Drama | undefined {
  return dramas.find(drama => drama.slug === slug)
}

// ドラマに関連するレビューを取得
export function getReviewsByDrama(reviews: Review[], dramaId: string): Review[] {
  return reviews.filter(review => review.dramaId === dramaId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// 最新のレビューを取得
export function getLatestReviews(reviews: Review[], limit: number = 5): Review[] {
  return reviews
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

// バカ度でドラマをソート
export function sortDramasByBakaLevel(dramas: Drama[]): Drama[] {
  return [...dramas].sort((a, b) => b.averageBakaLevel - a.averageBakaLevel)
}

// レビュー数でドラマをソート
export function sortDramasByReviewCount(dramas: Drama[]): Drama[] {
  return [...dramas].sort((a, b) => b.reviewCount - a.reviewCount)
}

// 日付フォーマット
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

// 要注意ドラマを取得
export function getWarningDramas(dramas: Drama[]): Drama[] {
  return dramas.filter(drama => drama.isWarning || drama.averageBakaLevel >= 4)
}

// ランダムなアクセスカウンタ生成
export function generateAccessCounter(): string {
  return String(Math.floor(Math.random() * 100000)).padStart(6, '0')
}