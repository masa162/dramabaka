export interface WeeklyDrama {
  id: string
  title: string
  slug: string
  broadcaster: string
  timeslot: string
  airDay: string
  genre: string[]
  status: 'airing' | 'completed' | 'upcoming'
}

export const WEEKLY_DRAMAS_2025_WINTER: WeeklyDrama[] = [
  // 月曜日
  {
    id: 'mon-1',
    title: 'あんぱん',
    slug: 'anpan',
    broadcaster: 'フジ',
    timeslot: '月9',
    airDay: 'monday',
    genre: ['恋愛'],
    status: 'airing'
  },
  {
    id: 'mon-2',
    title: '明日はもっと、いい日になる',
    slug: 'ashita-wa-motto',
    broadcaster: 'テレ朝',
    timeslot: '月10',
    airDay: 'monday',
    genre: ['ヒューマン'],
    status: 'airing'
  },
  {
    id: 'mon-3',
    title: 'あおぞらビール',
    slug: 'aozora-beer',
    broadcaster: 'TBS',
    timeslot: '月11',
    airDay: 'monday',
    genre: ['コメディ'],
    status: 'airing'
  },
  {
    id: 'mon-4',
    title: 'レプリカ',
    slug: 'replica',
    broadcaster: 'NHK',
    timeslot: '月10',
    airDay: 'monday',
    genre: ['サスペンス'],
    status: 'airing'
  },

  // 火曜日
  {
    id: 'tue-1',
    title: '誘拐の日',
    slug: 'yukai-no-hi',
    broadcaster: '日テレ',
    timeslot: '火10',
    airDay: 'tuesday',
    genre: ['サスペンス'],
    status: 'airing'
  },
  {
    id: 'tue-2',
    title: '初恋DOGs',
    slug: 'hatsukoi-dogs',
    broadcaster: 'フジ',
    timeslot: '火9',
    airDay: 'tuesday',
    genre: ['恋愛', 'コメディ'],
    status: 'airing'
  },
  {
    id: 'tue-3',
    title: '北くんがかわいすぎて手に余るので...',
    slug: 'kita-kun-kawaii',
    broadcaster: 'テレ朝',
    timeslot: '火11',
    airDay: 'tuesday',
    genre: ['恋愛'],
    status: 'airing'
  },
  {
    id: 'tue-4',
    title: '完全不倫-隠す美学、暴く覚悟-',
    slug: 'kanzen-furin',
    broadcaster: 'TBS',
    timeslot: '火10',
    airDay: 'tuesday',
    genre: ['恋愛', 'サスペンス'],
    status: 'airing'
  },
  {
    id: 'tue-5',
    title: '私があなたといる理由～グアムを訪...',
    slug: 'watashi-ga-anata-to',
    broadcaster: 'フジ',
    timeslot: '火11',
    airDay: 'tuesday',
    genre: ['恋愛'],
    status: 'airing'
  },
  {
    id: 'tue-6',
    title: 'トラックガール２',
    slug: 'truck-girl-2',
    broadcaster: '日テレ',
    timeslot: '火11',
    airDay: 'tuesday',
    genre: ['ヒューマン'],
    status: 'airing'
  },
  {
    id: 'tue-7',
    title: 'シンデレラ クロゼット',
    slug: 'cinderella-closet',
    broadcaster: 'NHK',
    timeslot: '火10',
    airDay: 'tuesday',
    genre: ['恋愛'],
    status: 'airing'
  },

  // 水曜日
  {
    id: 'wed-1',
    title: '大追跡～警視庁SSBC強行犯係',
    slug: 'daitsuseki-ssbc',
    broadcaster: 'テレ朝',
    timeslot: '水9',
    airDay: 'wednesday',
    genre: ['刑事'],
    status: 'airing'
  },
  {
    id: 'wed-2',
    title: 'ちはやふる-めぐり-',
    slug: 'chihayafuru-meguri',
    broadcaster: '日テレ',
    timeslot: '水10',
    airDay: 'wednesday',
    genre: ['青春'],
    status: 'airing'
  },
  {
    id: 'wed-3',
    title: '最後の鑑定人',
    slug: 'saigo-no-kanteinin',
    broadcaster: 'フジ',
    timeslot: '水10',
    airDay: 'wednesday',
    genre: ['サスペンス'],
    status: 'airing'
  },
  {
    id: 'wed-4',
    title: '海老だって鯛が釣りたい',
    slug: 'ebi-datte-tai',
    broadcaster: 'TBS',
    timeslot: '水10',
    airDay: 'wednesday',
    genre: ['コメディ'],
    status: 'airing'
  },
  {
    id: 'wed-5',
    title: '雨上がりの僕らについて',
    slug: 'ameagari-no-bokura',
    broadcaster: 'NHK',
    timeslot: '水10',
    airDay: 'wednesday',
    genre: ['ヒューマン'],
    status: 'airing'
  },
  {
    id: 'wed-6',
    title: '日本統一　東京編',
    slug: 'nippon-toitsu-tokyo',
    broadcaster: 'テレ東',
    timeslot: '水12',
    airDay: 'wednesday',
    genre: ['任侠'],
    status: 'airing'
  },
  {
    id: 'wed-7',
    title: 'ただの恋愛なんかできっこない',
    slug: 'tada-no-renai',
    broadcaster: 'フジ',
    timeslot: '水11',
    airDay: 'wednesday',
    genre: ['恋愛'],
    status: 'airing'
  },

  // 木曜日
  {
    id: 'thu-1',
    title: 'しあわせな結婚',
    slug: 'shiawase-na-kekkon',
    broadcaster: 'フジ',
    timeslot: '木10',
    airDay: 'thursday',
    genre: ['恋愛'],
    status: 'airing'
  },
  {
    id: 'thu-2',
    title: '恋愛禁止',
    slug: 'renai-kinshi',
    broadcaster: '日テレ',
    timeslot: '木10',
    airDay: 'thursday',
    genre: ['恋愛', 'コメディ'],
    status: 'airing'
  },
  {
    id: 'thu-3',
    title: 'やぶさかではございません',
    slug: 'yabusaka-dewa',
    broadcaster: 'TBS',
    timeslot: '木10',
    airDay: 'thursday',
    genre: ['コメディ'],
    status: 'airing'
  },
  {
    id: 'thu-4',
    title: 'ロンダリング',
    slug: 'laundering',
    broadcaster: 'テレ朝',
    timeslot: '木11',
    airDay: 'thursday',
    genre: ['サスペンス'],
    status: 'airing'
  },
  {
    id: 'thu-5',
    title: '量産型ルカ-プラモ部員の青き逆襲-',
    slug: 'ryosan-gata-luka',
    broadcaster: 'NHK',
    timeslot: '木10',
    airDay: 'thursday',
    genre: ['青春'],
    status: 'airing'
  },
  {
    id: 'thu-6',
    title: '世界で一番早い春',
    slug: 'sekai-de-ichiban-hayai-haru',
    broadcaster: 'フジ',
    timeslot: '木11',
    airDay: 'thursday',
    genre: ['ヒューマン'],
    status: 'airing'
  },
  {
    id: 'thu-7',
    title: '彩香ちゃんは弘子先輩に恋してる2nd...',
    slug: 'ayaka-chan-hiroko-senpai-2nd',
    broadcaster: 'テレ東',
    timeslot: '木12',
    airDay: 'thursday',
    genre: ['恋愛'],
    status: 'airing'
  },

  // 金曜日
  {
    id: 'fri-1',
    title: '能面検事',
    slug: 'nomen-kenji',
    broadcaster: 'テレ朝',
    timeslot: '金9',
    airDay: 'friday',
    genre: ['刑事'],
    status: 'airing'
  },
  {
    id: 'fri-2',
    title: 'DOPE 麻薬取締部捜査課',
    slug: 'dope-mayaku-torishimari',
    broadcaster: '日テレ',
    timeslot: '金10',
    airDay: 'friday',
    genre: ['刑事'],
    status: 'airing'
  },
  {
    id: 'fri-3',
    title: '奪い愛、真夏',
    slug: 'ubai-ai-manatsu',
    broadcaster: 'フジ',
    timeslot: '金10',
    airDay: 'friday',
    genre: ['恋愛'],
    status: 'airing'
  },
  {
    id: 'fri-4',
    title: '40までにしたい10のこと',
    slug: '40-made-ni-shitai-10-no-koto',
    broadcaster: 'TBS',
    timeslot: '金10',
    airDay: 'friday',
    genre: ['ヒューマン'],
    status: 'airing'
  },
  {
    id: 'fri-5',
    title: '晩酌の流儀４',
    slug: 'banshaku-no-ryugi-4',
    broadcaster: 'テレ東',
    timeslot: '金12',
    airDay: 'friday',
    genre: ['グルメ'],
    status: 'airing'
  },

  // 土曜日
  {
    id: 'sat-1',
    title: 'ウルトラマンオメガ',
    slug: 'ultraman-omega',
    broadcaster: 'TBS',
    timeslot: '土6',
    airDay: 'saturday',
    genre: ['特撮'],
    status: 'airing'
  },
  {
    id: 'sat-2',
    title: '放送局占拠',
    slug: 'hoso-kyoku-senkyo',
    broadcaster: '日テレ',
    timeslot: '土10',
    airDay: 'saturday',
    genre: ['サスペンス'],
    status: 'airing'
  },
  {
    id: 'sat-3',
    title: 'ひとりでしにたい',
    slug: 'hitori-de-shinitai',
    broadcaster: 'フジ',
    timeslot: '土11',
    airDay: 'saturday',
    genre: ['ヒューマン'],
    status: 'airing'
  },
  {
    id: 'sat-4',
    title: 'リベンジ・スパイ',
    slug: 'revenge-spy',
    broadcaster: 'テレ朝',
    timeslot: '土11',
    airDay: 'saturday',
    genre: ['アクション'],
    status: 'airing'
  },
  {
    id: 'sat-5',
    title: '浅草ラスボスおばあちゃん',
    slug: 'asakusa-last-boss-obachan',
    broadcaster: 'NHK',
    timeslot: '土9',
    airDay: 'saturday',
    genre: ['コメディ'],
    status: 'airing'
  },

  // 日曜日
  {
    id: 'sun-1',
    title: 'べらぼう〜蔦重栄華乃夢噺〜',
    slug: 'berabou',
    broadcaster: 'NHK',
    timeslot: '日8',
    airDay: 'sunday',
    genre: ['taiga'],
    status: 'airing'
  },
  {
    id: 'sun-2',
    title: '19番目のカルテ',
    slug: '19-banme-no-karute',
    broadcaster: 'フジ',
    timeslot: '日9',
    airDay: 'sunday',
    genre: ['医療'],
    status: 'airing'
  },
  {
    id: 'sun-3',
    title: '照子と瑠衣',
    slug: 'teruko-to-rui',
    broadcaster: '日テレ',
    timeslot: '日10',
    airDay: 'sunday',
    genre: ['ヒューマン'],
    status: 'airing'
  },
  {
    id: 'sun-4',
    title: 'こんばんは、朝山家です。',
    slug: 'konbanwa-asayama-ke',
    broadcaster: 'TBS',
    timeslot: '日9',
    airDay: 'sunday',
    genre: ['ファミリー'],
    status: 'airing'
  },
  {
    id: 'sun-5',
    title: 'DOCTOR PRICE',
    slug: 'doctor-price',
    broadcaster: 'テレ朝',
    timeslot: '日9',
    airDay: 'sunday',
    genre: ['医療'],
    status: 'airing'
  },
  {
    id: 'sun-6',
    title: 'アストリッドとラファエル　文書係...',
    slug: 'astrid-raphael-bunsho-kakari',
    broadcaster: 'NHK',
    timeslot: '日11',
    airDay: 'sunday',
    genre: ['サスペンス'],
    status: 'airing'
  }
]

export const WEEKLY_SCHEDULE = {
  monday: '月',
  tuesday: '火', 
  wednesday: '水',
  thursday: '木',
  friday: '金',
  saturday: '土',
  sunday: '日'
} as const

export function getDramasByDay(day: keyof typeof WEEKLY_SCHEDULE): WeeklyDrama[] {
  return WEEKLY_DRAMAS_2025_WINTER.filter(drama => drama.airDay === day)
}

export function getAllWeeklyDramas(): Record<keyof typeof WEEKLY_SCHEDULE, WeeklyDrama[]> {
  return Object.keys(WEEKLY_SCHEDULE).reduce((acc, day) => {
    acc[day as keyof typeof WEEKLY_SCHEDULE] = getDramasByDay(day as keyof typeof WEEKLY_SCHEDULE)
    return acc
  }, {} as Record<keyof typeof WEEKLY_SCHEDULE, WeeklyDrama[]>)
}