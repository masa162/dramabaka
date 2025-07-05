import { BakaLevelInfo } from './types'

export const BAKA_LEVELS: Record<1 | 2 | 3 | 4 | 5, BakaLevelInfo> = {
  1: {
    level: 1,
    stars: '★',
    label: 'まだ正気',
    emoji: '🧠',
    description: '健全なドラマファンです。この調子で適度に楽しみましょう。'
  },
  2: {
    level: 2,
    stars: '★★',
    label: 'ちょっとヤバい',
    emoji: '🧠🧠',
    description: '要注意人物認定。録画予約が増え始めています。'
  },
  3: {
    level: 3,
    stars: '★★★',
    label: '沼が見えてきた',
    emoji: '🧠🧠🧠',
    description: '沼の住人一歩手前。まだ引き返せるかもしれません...。'
  },
  4: {
    level: 4,
    stars: '★★★★',
    label: 'もう戻れない',
    emoji: '🧠🧠🧠🧠',
    description: '重度廃人認定。仕事・家事に支障をきたし始めています。'
  },
  5: {
    level: 5,
    stars: '★★★★★',
    label: '完全に廃人',
    emoji: '🧠🧠🧠🧠🧠',
    description: 'バカ殿堂入り。もはや手の施しようがありません。'
  }
} as const

export const BROADCASTERS = [
  'フジ',
  '日テレ',
  'TBS',
  'テレ朝',
  'テレ東'
] as const

export const GENRES = [
  '恋愛',
  'サスペンス',
  '医療',
  '刑事',
  '学園',
  '家族',
  'コメディ',
  'ヒューマン',
  '時代劇',
  'SF・ファンタジー'
] as const

export const TIMESLOTS = [
  '月9',
  '火9',
  '火10',
  '水9',
  '水10',
  '木9',
  '木10',
  '金9',
  '金10',
  '土9',
  '土10',
  '日9',
  '日10'
] as const