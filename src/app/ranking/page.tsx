import Header from '@/components/layout/Header'
import Menu from '@/components/layout/Menu'
import LeftSidebar from '@/components/layout/LeftSidebar'
import RightSidebar from '@/components/layout/RightSidebar'
import Footer from '@/components/layout/Footer'
import ContentSection from '@/components/common/ContentSection'
import { SAMPLE_DRAMAS } from '@/lib/data/dramas'
import { sortDramasByBakaLevel, sortDramasByReviewCount, formatBakaLevel } from '@/lib/utils'
import Link from 'next/link'

export default function RankingPage() {
  const bakaLevelRanking = sortDramasByBakaLevel(SAMPLE_DRAMAS)
  const buzzRanking = sortDramasByReviewCount(SAMPLE_DRAMAS)

  return (
    <>
      <Header />
      <Menu />

      <div className="main-container">
        <div className="main-table">
          <LeftSidebar />
          
          <div className="center-column">
            <ContentSection title="◆廃人度ランキング◆">
              <div style={{margin: '20px 0'}}>
                <h3>💀 廃人製造ドラマ TOP5</h3>
                <p style={{fontSize: '12px', color: '#666', marginBottom: '15px'}}>
                  ※バカ度の高い順でランキングしています
                </p>
                
                {bakaLevelRanking.map((drama, index) => (
                  <div key={drama.id} className="ranking-item" style={{padding: '12px', marginBottom: '10px', border: '1px solid #cccccc', background: index < 3 ? '#fff9f9' : '#ffffff'}}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                      <span style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: index === 0 ? '#gold' : index === 1 ? '#silver' : index === 2 ? '#cd7f32' : '#666',
                        minWidth: '40px'
                      }}>
                        {index + 1}位
                      </span>
                      <div style={{marginLeft: '15px', flex: 1}}>
                        <div style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '4px'}}>
                          <Link href={`/dramas/${drama.slug}`} style={{color: '#0000ff'}}>
                            {drama.title}
                          </Link>
                          {drama.isWarning && <span className="hot-icon" style={{marginLeft: '8px'}}>要注意</span>}
                        </div>
                        <div style={{fontSize: '14px', color: '#ff0000', fontWeight: 'bold', marginBottom: '4px'}}>
                          バカ度：{formatBakaLevel(drama.averageBakaLevel)}
                        </div>
                        <div style={{fontSize: '12px', color: '#666'}}>
                          {drama.broadcaster} {drama.timeslot} | レビュー{drama.reviewCount}件
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ContentSection>

            <ContentSection title="◆バズドラマランキング◆">
              <div style={{margin: '20px 0'}}>
                <h3>🔥 話題沸騰中ドラマ TOP5</h3>
                <p style={{fontSize: '12px', color: '#666', marginBottom: '15px'}}>
                  ※レビュー数の多い順でランキングしています
                </p>
                
                {buzzRanking.map((drama, index) => (
                  <div key={drama.id} className="ranking-item" style={{padding: '12px', marginBottom: '10px', border: '1px solid #cccccc', background: index < 3 ? '#f9fff9' : '#ffffff'}}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                      <span style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: index === 0 ? '#gold' : index === 1 ? '#silver' : index === 2 ? '#cd7f32' : '#666',
                        minWidth: '40px'
                      }}>
                        {index + 1}位
                      </span>
                      <div style={{marginLeft: '15px', flex: 1}}>
                        <div style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '4px'}}>
                          <Link href={`/dramas/${drama.slug}`} style={{color: '#0000ff'}}>
                            {drama.title}
                          </Link>
                          {drama.isWarning && <span className="hot-icon" style={{marginLeft: '8px'}}>要注意</span>}
                        </div>
                        <div style={{fontSize: '14px', color: '#ff6600', fontWeight: 'bold', marginBottom: '4px'}}>
                          {drama.reviewCount}件のレビュー
                        </div>
                        <div style={{fontSize: '12px', color: '#666'}}>
                          {drama.broadcaster} {drama.timeslot} | バカ度：{formatBakaLevel(drama.averageBakaLevel)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ContentSection>
            
            <div style={{textAlign: 'center', marginTop: '20px'}}>
              <Link href="/" className="button-link">&lt;&lt; HOMEに戻る</Link>
            </div>
          </div>
          
          <RightSidebar />
        </div>
      </div>
      
      <Footer />
    </>
  )
}