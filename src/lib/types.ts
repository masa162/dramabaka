// ドラマの基本情報（既存）
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

// ドラマ詳細情報（新規）
export interface DramaDetail {
  // 基本情報
  title: string
  slug: string
  english_title?: string
  
  // 放送情報
  broadcaster: string
  genre: string
  season: 'winter' | 'spring' | 'summer' | 'autumn'
  year: number
  timeslot: string
  air_start: string
  air_end?: string
  total_episodes: number
  episode_length: number
  
  // 制作・キャスト
  production: {
    script: string[]
    director: string[]
    producer: string[]
    music?: string
    production_company: string
  }
  
  cast: {
    main: Array<{
      name: string
      character: string
      description: string
    }>
    supporting: Array<{
      name: string
      character: string
      description: string
    }>
  }
  
  // コンテンツ
  synopsis: string
  content: string
  
  // バカ度
  initial_baka_level: number
  warning_flags: string[]
  
  // メタデータ
  tags: string[]
  categories: string[]
  status: 'upcoming' | 'airing' | 'ended' | 'cancelled'
  
  // 管理情報
  created_at: string
  updated_at: string
  author: string
  
  // パス情報
  filePath: string
  urlPath: string
  imagePath: string
}

// レビュー・感想（既存データ用）
export interface LegacyReview {
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

// レビュー・感想（新フォーム用）
export interface Review {
  id: string
  dramaSlug: string
  nickname: string
  emotion: string
  bakaLevel: number
  quickReview: string
  detailedReview?: string
  timestamp: string
  likes: number
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

// いいね機能関連の型定義
export interface UserLike {
  reviewId: string
  timestamp: string
  userId: string // ブラウザ固有ID
}

export interface LikeStats {
  totalLikes: number
  likedReviews: Set<string>
  myLikesCount: number
}