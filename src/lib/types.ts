// ドラマの基本情報
export interface Drama {
  id: string
  title: string
  slug: string
  broadcaster: 'フジ' | '日テレ' | 'TBS' | 'テレ朝' | 'テレ東'
  timeslot: string      // "月9", "火9", "水10" etc
  genre: string[]       // ["恋愛", "サスペンス", "医療"]
  cast: string[]
  synopsis: string
  startDate: string     // "2025-01-01"
  endDate: string | null
  averageBakaLevel: 1 | 2 | 3 | 4 | 5
  reviewCount: number
  status: 'airing' | 'ended' | 'upcoming'
  isWarning: boolean    // 要注意フラグ
  posterUrl?: string
}

// レビュー・感想
export interface Review {
  id: string
  dramaId: string
  nickname: string      // "バカ仲間A", "沼民B"
  bakaLevel: 1 | 2 | 3 | 4 | 5
  oneLineComment: string
  detailedReview?: string
  highlights?: string   // 見どころ
  complaints?: string   // ツッコミポイント
  dangerLevel?: string  // 廃人危険度コメント
  createdAt: string
  likes: number
  isNew: boolean        // NEWマーク
  isHot: boolean        // HOTマーク
}

// バカ度レベル定義
export interface BakaLevelInfo {
  level: 1 | 2 | 3 | 4 | 5
  stars: string
  label: string
  emoji: string
  description: string
}

// ランキング項目
export interface RankingItem {
  rank: number
  drama: Drama
  score: number
  type: 'baka-level' | 'review-count' | 'buzz'
}

// バカ度診断の質問
export interface BakaCheckQuestion {
  id: number
  question: string
  options: {
    text: string
    score: number
  }[]
}

// バカ度診断結果
export interface BakaCheckResult {
  totalScore: number
  level: 1 | 2 | 3 | 4 | 5
  info: BakaLevelInfo
  recommendation: string[]
}