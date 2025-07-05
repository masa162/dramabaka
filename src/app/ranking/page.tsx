import Header from '@/components/layout/Header'
import Menu from '@/components/layout/Menu'
import LeftSidebar from '@/components/layout/LeftSidebar'
import RightSidebar from '@/components/layout/RightSidebar'
import Footer from '@/components/layout/Footer'
import ContentSection from '@/components/common/ContentSection'
import Link from 'next/link'

export default function RankingPage() {
  return (
    <>
      <Header />
      <Menu />

      <div className="main-container">
        <div className="main-table">
          <LeftSidebar />
          
          <div className="center-column">
            <ContentSection title="◆バカ度ランキング◆">
              <p>ここにランキングが表示されます（Phase 3で実装予定）</p>
              
              <div style={{margin: '20px 0'}}>
                <h3>💀 廃人製造ドラマ TOP10</h3>
                <ol>
                  <li>九龍城塞の恋人 (★★★★★)</li>
                  <li>アンメット ある脳外科医の日記 (★★★★★)</li>
                  <li>不適切にもほどがある！ (★★★★)</li>
                  <li>トリリオンゲーム (★★★)</li>
                  <li>厨房のありす (★★)</li>
                </ol>
              </div>
              
              <Link href="/" className="button-link">&lt;&lt; HOMEに戻る</Link>
            </ContentSection>
          </div>
          
          <RightSidebar />
        </div>
      </div>
      
      <Footer />
    </>
  )
}