import Link from 'next/link'
import { SAMPLE_DRAMAS } from '@/lib/data/dramas'
import { sortDramasByBakaLevel, formatBakaLevel, generateAccessCounter } from '@/lib/utils'

export default function LeftSidebar() {
  const topDramas = sortDramasByBakaLevel(SAMPLE_DRAMAS).slice(0, 5)
  const warningDrama = SAMPLE_DRAMAS.find(d => d.isWarning)
  const accessCount = generateAccessCounter()

  return (
    <div className="left-column">
      <div className="sidebar-section">
        <div className="sidebar-header">アクセスカウンタ</div>
        <div className="sidebar-content">
          <div className="counter">{accessCount}</div>
          あなたは{accessCount}人目の<br />
          バカ仲間です！
        </div>
      </div>
      
      {warningDrama && (
        <div className="sidebar-section">
          <div className="sidebar-header">★今週の要注意★</div>
          <div className="sidebar-content">
            <div className="sparkle">{warningDrama.title}</div>
            <div style={{color: '#ff0000', fontWeight: 'bold'}}>
            {formatBakaLevel(warningDrama.averageBakaLevel)}(廃人確定)
            </div>
            <div style={{fontSize: '10px', marginTop: '3px'}}>
            完全にヤバいです。<br />
            視聴注意！！！
            </div>
          </div>
        </div>
      )}
      
      <div className="sidebar-section">
        <div className="sidebar-header">廃人度ランキング</div>
        <div className="sidebar-content">
          {topDramas.map((drama, index) => (
            <div key={drama.id} className="ranking-item">
              <span className="ranking-number">{index + 1}位</span>
              <span className="ranking-title">
                <Link href={`/dramas/${drama.slug}`}>{drama.title}</Link>
              </span>
              <span className="ranking-score">{formatBakaLevel(drama.averageBakaLevel)}</span>
            </div>
          ))}
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