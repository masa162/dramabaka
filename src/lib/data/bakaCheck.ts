import { BakaCheckQuestion } from '../types'

export const BAKA_CHECK_QUESTIONS: BakaCheckQuestion[] = [
  {
    id: 1,
    question: 'ドラマの録画予約はいくつありますか？',
    options: [
      { text: '0〜2個', score: 1 },
      { text: '3〜5個', score: 2 },
      { text: '6〜10個', score: 3 },
      { text: '11〜20個', score: 4 },
      { text: '21個以上（数えるのも面倒）', score: 5 }
    ]
  },
  {
    id: 2,
    question: 'ドラマを見るために睡眠時間を削ったことは？',
    options: [
      { text: 'ない', score: 1 },
      { text: 'たまに（月1回程度）', score: 2 },
      { text: '時々（週1回程度）', score: 3 },
      { text: 'よくある（週3回以上）', score: 4 },
      { text: '毎日のように', score: 5 }
    ]
  },
  {
    id: 3,
    question: 'ドラマのせいで仕事・家事に支障をきたしたことは？',
    options: [
      { text: 'ない', score: 1 },
      { text: 'ほとんどない', score: 2 },
      { text: 'たまにある', score: 3 },
      { text: 'よくある', score: 4 },
      { text: '常にある（もはや生活の一部）', score: 5 }
    ]
  },
  {
    id: 4,
    question: '同じドラマを何回見直しますか？',
    options: [
      { text: '1回（基本リアルタイム）', score: 1 },
      { text: '2回（録画でもう一度）', score: 2 },
      { text: '3〜4回', score: 3 },
      { text: '5〜10回', score: 4 },
      { text: '数え切れない（セリフ暗記レベル）', score: 5 }
    ]
  },
  {
    id: 5,
    question: 'ドラマの話題で何時間語れますか？',
    options: [
      { text: '30分未満', score: 1 },
      { text: '1時間程度', score: 2 },
      { text: '2〜3時間', score: 3 },
      { text: '半日以上', score: 4 },
      { text: '永遠に（止まらない）', score: 5 }
    ]
  },
  {
    id: 6,
    question: 'ドラマのロケ地巡りをしたことは？',
    options: [
      { text: 'ない', score: 1 },
      { text: 'たまたま通りかかった程度', score: 2 },
      { text: '1〜2回行ったことがある', score: 3 },
      { text: '複数回行っている', score: 4 },
      { text: '聖地巡礼が趣味', score: 5 }
    ]
  },
  {
    id: 7,
    question: 'ドラマ関連グッズを購入したことは？',
    options: [
      { text: 'ない', score: 1 },
      { text: '写真集やDVDを少し', score: 2 },
      { text: '複数のグッズを購入', score: 3 },
      { text: 'かなりの金額を投資', score: 4 },
      { text: '部屋がドラマグッズで埋まっている', score: 5 }
    ]
  },
  {
    id: 8,
    question: 'ドラマの俳優のSNSをチェックする頻度は？',
    options: [
      { text: 'チェックしない', score: 1 },
      { text: 'たまに見る程度', score: 2 },
      { text: '週に数回', score: 3 },
      { text: '毎日チェック', score: 4 },
      { text: '更新通知ONで即チェック', score: 5 }
    ]
  },
  {
    id: 9,
    question: 'ドラマが終了した時の喪失感は？',
    options: [
      { text: '特に何も感じない', score: 1 },
      { text: '少し寂しい程度', score: 2 },
      { text: 'しばらく引きずる', score: 3 },
      { text: '数週間は立ち直れない', score: 4 },
      { text: '人生の一部を失った感覚', score: 5 }
    ]
  },
  {
    id: 10,
    question: 'ドラマについて語り合える友人・家族は？',
    options: [
      { text: 'いない（一人で楽しむ）', score: 2 },
      { text: '1〜2人', score: 2 },
      { text: '3〜5人', score: 3 },
      { text: '6人以上', score: 4 },
      { text: 'ドラマ仲間のコミュニティがある', score: 5 }
    ]
  }
]