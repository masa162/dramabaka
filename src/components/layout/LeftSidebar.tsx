import Link from 'next/link'

export default function LeftSidebar() {
  return (
    <div className="left-column">
      <div className="sidebar-section">
        <div className="sidebar-header">アクセスカウンタ</div>
        <div className="sidebar-content">
          <div className="counter">012345</div>
          あなたは012345人目の<br />
          バカ仲間です！
        </div>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-header">★今週の要注意★</div>
        <div className="sidebar-content">
          <div className="sparkle">九龍城塞の恋人</div>
          <div style={{color: '#ff0000', fontWeight: 'bold'}}>
          ★★★★★(廃人確定)
          </div>
          <div style={{fontSize: '10px', marginTop: '3px'}}>
          完全にヤバいです。<br />
          視聴注意！！！
          </div>
        </div>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-header">廃人度ランキング</div>
        <div className="sidebar-content">
          <div className="ranking-item">
            <span className="ranking-number">1位</span>
            <span className="ranking-title">九龍城塞の恋人</span>
            <span className="ranking-score">★★★★★</span>
          </div>
          <div className="ranking-item">
            <span className="ranking-number">2位</span>
            <span className="ranking-title">アンメット</span>
            <span className="ranking-score">★★★★★</span>
          </div>
          <div className="ranking-item">
            <span className="ranking-number">3位</span>
            <span className="ranking-title">不適切にもほどがる</span>
            <span className="ranking-score">★★★★</span>
          </div>
          <div className="ranking-item">
            <span className="ranking-number">4位</span>
            <span className="ranking-title">トリリオンゲーム</span>
            <span className="ranking-score">★★★</span>
          </div>
          <div className="ranking-item">
            <span className="ranking-number">5位</span>
            <span className="ranking-title">厨房のありす</span>
            <span className="ranking-score">★★</span>
          </div>
        </div>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-header">便利リンク</div>
        <div className="sidebar-content">
          <Link href="/baka-check">▼バカ度診断</Link><br />
          <Link href="/ranking">▼廃人ランキング</Link><br />
          <Link href="/bbs">▼愚痴掲示板</Link><br />
          <Link href="/search">▼ドラマ検索</Link><br />
        </div>
      </div>
    </div>
  )
}