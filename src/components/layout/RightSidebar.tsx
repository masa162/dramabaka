import Link from 'next/link'
import { SAMPLE_DRAMAS } from '@/lib/data/dramas'
import { sortDramasByReviewCount } from '@/lib/utils'

export default function RightSidebar() {
  const buzzDramas = sortDramasByReviewCount(SAMPLE_DRAMAS).slice(0, 3)

  return (
    <div className="right-column">
      <div className="sidebar-section">
        <div className="sidebar-header">今週のバズドラマ</div>
        <div className="sidebar-content">
          {buzzDramas.map((drama, index) => {
            const medals = ['🥇', '🥈', '🥉']
            return (
              <div key={drama.id} className="ranking-item">
                <span className="ranking-number">{medals[index]}</span>
                <span className="ranking-title">
                  <Link href={`/dramas/${drama.slug}`}>{drama.title}</Link>
                </span>
                <span className="ranking-score">{drama.reviewCount}件</span>
              </div>
            )
          })}
        </div>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-header">バカ度診断</div>
        <div className="sidebar-content">
          あなたのドラマ依存度は？<br />
          10個の質問で判定！<br /><br />
          <Link href="/baka-check" className="button-link">診断スタート</Link>
        </div>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-header">相互リンク</div>
        <div className="sidebar-content">
          <a href="#">ドラマ好きの集い</a><br />
          <a href="#">テレビっ子広場</a><br />
          <a href="#">深夜ドラマ愛好会</a><br />
          <a href="#">月9中毒者の会</a><br />
          <br />
          <Link href="/link">リンク集 &gt;&gt;</Link>
        </div>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-header">管理人について</div>
        <div className="sidebar-content">
          HN：廃人1号<br />
          年齢：40代<br />
          職業：会社員(仮)<br />
          趣味：ドラマ鑑賞<br />
          特技：録画予約<br />
          座右の銘：<br />
          「ドラマは人生だ」<br /><br />
          <a href="mailto:admin@dramabaka.com">連絡先</a>
        </div>
      </div>
    </div>
  )
}