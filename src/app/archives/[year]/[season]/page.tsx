import { notFound } from 'next/navigation'
import ContentSection from '@/components/common/ContentSection'
import SeasonDetail from '@/components/archives/SeasonDetail'
import { loadArchiveData, getDramasBySeason } from '@/lib/data/archives'

interface Props {
  params: Promise<{ 
    year: string
    season: string 
  }>
}

// 有効な季節名を定義
const VALID_SEASONS = ['spring', 'summer', 'autumn', 'winter']

export default async function SeasonDetailPage({ params }: Props) {
  const { year, season } = await params
  const yearNum = parseInt(year)

  // パラメータバリデーション
  if (isNaN(yearNum) || yearNum < 2020 || yearNum > 2030) {
    notFound()
  }

  if (!VALID_SEASONS.includes(season)) {
    notFound()
  }

  // アーカイブデータを読み込み
  const archives = await loadArchiveData()
  
  // 指定された年・季節の情報を検索
  const yearArchive = archives.find(archive => archive.year === yearNum)
  if (!yearArchive) {
    notFound()
  }

  const seasonInfo = yearArchive.seasons.find(s => s.season === season)
  if (!seasonInfo) {
    notFound()
  }

  // 該当するドラマデータを取得
  const dramas = await getDramasBySeason(yearNum, season)

  return (
    <ContentSection title={`📚 ${yearNum}年${seasonInfo.seasonDisplay}クール アーカイブ`}>
      <SeasonDetail seasonInfo={seasonInfo} dramas={dramas} />
    </ContentSection>
  )
}

// 静的パラメータを生成
export async function generateStaticParams() {
  const archives = await loadArchiveData()
  const params: { year: string; season: string }[] = []

  archives.forEach(yearArchive => {
    yearArchive.seasons.forEach(season => {
      params.push({
        year: yearArchive.year.toString(),
        season: season.season
      })
    })
  })

  return params
}