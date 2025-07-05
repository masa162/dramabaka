import Header from '@/components/layout/Header'
import Menu from '@/components/layout/Menu'
import LeftSidebar from '@/components/layout/LeftSidebar'
import RightSidebar from '@/components/layout/RightSidebar'
import Footer from '@/components/layout/Footer'
import ContentSection from '@/components/common/ContentSection'
import Link from 'next/link'

export default function BakaCheckPage() {
  return (
    <>
      <Header />
      <Menu />

      <div className="main-container">
        <div className="main-table">
          <LeftSidebar />
          
          <div className="center-column">
            <ContentSection title="◆バカ度診断◆">
              <p style={{textAlign: 'center', margin: '20px 0'}}>
                <strong>あなたのドラマ依存度を診断します！</strong>
              </p>
              
              <div style={{margin: '20px 0'}}>
                <h3>🧠 診断内容</h3>
                <ul>
                  <li>10個の質問でバカ度を測定</li>
                  <li>★1〜★5で廃人度判定</li>
                  <li>あなたの危険度をチェック</li>
                  <li>おすすめドラマを処方箋として提示</li>
                </ul>
              </div>
              
              <div style={{textAlign: 'center', margin: '30px 0'}}>
                <p>※診断機能はPhase 3で実装予定です</p>
                <br />
                <Link href="/" className="button-link">HOMEに戻る</Link>
              </div>
            </ContentSection>
          </div>
          
          <RightSidebar />
        </div>
      </div>
      
      <Footer />
    </>
  )
}