// 旧URL形式から新IDへのマッピング
export const DRAMA_URL_MAPPING: Record<string, number> = {
  'berabou': 1301,
  'anpan': 1302,
  'yukai-no-hi': 1303,
  'hatsukoi-dogs': 1304,
  'ashita-wa-motto': 1305,
  'daitsuseki-ssbc': 1306,
  'chihayafuru-meguri': 1307,
  '19-banme-no-karute': 1308,
  'nomen-kenji': 1309,
  'hoso-kyoku-senkyo': 1310
}

// SlugからIDを取得する関数
export function getIdBySlug(slug: string): number | null {
  return DRAMA_URL_MAPPING[slug] || null
}

// 旧URL形式 /drama/year/season/broadcaster/genre/slug から新URL /drama/id に変換
export function convertOldUrlToNew(
  year: string, 
  season: string, 
  broadcaster: string, 
  genre: string, 
  slug: string
): string {
  const id = getIdBySlug(slug)
  if (id) {
    return `/drama/${id}`
  }
  // フォールバック：見つからない場合は元のURL構造を維持
  return `/drama/${year}/${season}/${broadcaster}/${genre}/${slug}`
}

// 今季ドラマの曜日別リスト（CSVベース）
export const CURRENT_SEASON_BY_DAY = {
  monday: [1302, 1305], // あんぱん, 明日はもっと、いい日になる
  tuesday: [1303, 1304], // 誘拐の日, 初恋DOGs
  wednesday: [1306, 1307], // 大追跡, ちはやふる
  thursday: [],
  friday: [1309], // 能面検事
  saturday: [1310], // 放送局占拠
  sunday: [1301, 1308] // べらぼう, 19番目のカルテ
}

// 曜日名の日本語マッピング
export const DAY_MAPPING = {
  monday: '月',
  tuesday: '火',
  wednesday: '水', 
  thursday: '木',
  friday: '金',
  saturday: '土',
  sunday: '日'
} as const