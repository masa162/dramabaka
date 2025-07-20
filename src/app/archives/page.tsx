import ContentSection from '@/components/common/ContentSection'
import CurrentSeasonList from '@/components/archives/CurrentSeasonList'
import YearlyArchive from '@/components/archives/YearlyArchive'
import { loadArchiveData, loadCurrentSeasonDramas } from '@/lib/data/archives'
import Link from 'next/link'

export default async function ArchivesPage() {
  // データを並行読み込み
  const [archives, currentDramas] = await Promise.all([
    loadArchiveData(),
    loadCurrentSeasonDramas()
  ])

  const totalArchiveDramas = archives.reduce((sum, year) => sum + year.totalDramas, 0)

  return (
    <>
      <ContentSection title="📚 ドラマアーカイブ">
        {/* 今シーズンコンポーネント */}
        <CurrentSeasonList 
          dramas={currentDramas} 
          year={2025} 
          season="冬" 
        />

        {/* 年度別アーカイブコンポーネント */}
        <YearlyArchive archives={archives} />

        {/* 統計情報 */}
        <div style={{
          background: 'linear-gradient(90deg, #ff6600, #ff9900)',
          color: 'white',
          padding: '15px',
          borderRadius: '5px',
          margin: '20px 0',
          textAlign: 'center'
        }}>
          <h4 style={{margin: '0 0 10px 0'}}>📊 ドラマバカ一代 統計</h4>
          <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
            <div>
              <strong>総アーカイブ数</strong><br/>
              {totalArchiveDramas + currentDramas.length}本
            </div>
            <div>
              <strong>データベース期間</strong><br/>
              2022年〜現在
            </div>
            <div>
              <strong>最高バカ度記録</strong><br/>
              🧠🧠🧠🧠🧠 (VIVANT)
            </div>
          </div>
        </div>

        {/* ナビゲーション */}
        <div style={{textAlign: 'center', marginTop: '30px'}}>
          <Link href="/" className="button-link" style={{marginRight: '10px'}}>
            &lt;&lt; HOMEに戻る
          </Link>
          <Link href="/dramas" className="button-link" style={{marginRight: '10px'}}>
            📺 放送中のドラマ一覧
          </Link>
          <Link href="/ranking" className="button-link">
            🏆 ランキング
          </Link>
        </div>
      </ContentSection>
    </>
  )
}