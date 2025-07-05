import { Review } from '../types'

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    dramaId: '4',
    nickname: 'バカ仲間A',
    bakaLevel: 3,
    oneLineComment: '毎回ドキドキが止まらない...もう仕事が手につかない',
    detailedReview: '録画を3回見直してしまった自分がヤバい。目黒蓮くんがカッコよすぎて生きるのが辛い。',
    createdAt: '2025-07-05T18:30:00',
    likes: 12,
    isNew: true,
    isHot: false
  },
  {
    id: '2',
    dramaId: '3',
    nickname: '沼民B',
    bakaLevel: 4,
    oneLineComment: '昭和と令和が混在する世界観にハマりすぎて危険',
    detailedReview: '阿部サダヲの演技に完全にやられました。タイムスリップ設定が絶妙すぎる。',
    createdAt: '2025-07-05T17:45:00',
    likes: 25,
    isNew: false,
    isHot: true
  },
  {
    id: '3',
    dramaId: '2',
    nickname: '廃人C',
    bakaLevel: 5,
    oneLineComment: '医療ドラマなのに恋愛要素で完全に沼落ち',
    detailedReview: '杉咲花ちゃんが可愛すぎて生きるのが辛い...助けて。医療要素どこ行った。',
    createdAt: '2025-07-05T16:20:00',
    likes: 38,
    isNew: false,
    isHot: true
  },
  {
    id: '4',
    dramaId: '1',
    nickname: '完全廃人D',
    bakaLevel: 5,
    oneLineComment: '九龍城塞の世界観で完全に現実逃避中',
    detailedReview: '香港の街並みに魅了され、もはや現実に戻れません。吉高由里子の演技が神すぎる。',
    createdAt: '2025-07-05T15:10:00',
    likes: 45,
    isNew: false,
    isHot: true
  },
  {
    id: '5',
    dramaId: '5',
    nickname: '健全市民E',
    bakaLevel: 2,
    oneLineComment: '家族で安心して見られる良作',
    detailedReview: '料理シーンが美しく、家族愛に心温まる。まだ正気を保てている自分に安堵。',
    createdAt: '2025-07-05T14:00:00',
    likes: 8,
    isNew: false,
    isHot: false
  }
]