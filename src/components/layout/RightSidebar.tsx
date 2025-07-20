import Link from 'next/link'
import { SAMPLE_DRAMAS } from '@/lib/data/dramas'
import { parseDramasCSV, getCurrentDramasByDay, DAY_NAMES } from '@/lib/data/csv-parser'
import { sortDramasByReviewCount, sortDramasByBakaLevel, generateAccessCounter, formatBakaLevel } from '@/lib/utils'
import fs from 'fs'
import path from 'path'

export default function RightSidebar() {
  const buzzDramas = sortDramasByReviewCount(SAMPLE_DRAMAS).slice(0, 3)
  const topDramas = sortDramasByBakaLevel(SAMPLE_DRAMAS).slice(0, 5)
  const warningDrama = SAMPLE_DRAMAS.find(d => d.isWarning)
  const accessCount = generateAccessCounter()
  
  // CSVデータから放送中ドラマを取得
  const csvPath = path.join(process.cwd(), 'src/lib/data/dramas_master.csv')
  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const allDramas = parseDramasCSV(csvContent)
  const weeklyDramas = getCurrentDramasByDay(allDramas)

  return (
    <div className="unified-sidebar">
      {/* 1. ナビゲーションセクション */}
      <div className="sidebar-section navigation-section">
        <div className="sidebar-header">📺 ナビゲーション</div>
        <div className="sidebar-content">
          <div className="nav-menu">
            <Link href="/" className="nav-link">🏠 HOME</Link>
            <Link href="/dramas" className="nav-link">📺 ドラマ一覧</Link>
            <Link href="/archives" className="nav-link">📚 アーカイブ</Link>
            <Link href="/ranking" className="nav-link">🏆 ランキング</Link>
            <Link href="/baka-check" className="nav-link">🧠 バカ度診断</Link>
            <Link href="/reviews" className="nav-link">📝 過去投稿</Link>
            <Link href="/bbs" className="nav-link">💬 愚痴掲示板</Link>
            <Link href="/search" className="nav-link">🔍 ドラマ検索</Link>
            <Link href="/link" className="nav-link">🔗 リンク集</Link>
          </div>
        </div>
      </div>

      {/* 2. 放送中のドラマ（曜日別一覧） */}
      <div className="sidebar-section current-dramas-section">
        <div className="sidebar-header">📺 放送中のドラマ</div>
        <div className="sidebar-content">
          <div className="weekly-drama-list">
            {Object.entries(weeklyDramas).map(([day, dramas]) => (
              <div key={day} className="weekly-day-section">
                <div className="day-header">{DAY_NAMES[day]}</div>
                <div className="day-dramas">
                  {dramas.map(drama => (
                    <div key={drama.id} className="weekly-drama-item">
                      <Link href={`/drama/${drama.id}`}>
                        {drama.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 既存の他コンテンツ */}

      {/* アクセスカウンタ */}
      <div className="sidebar-section counter-section">
        <div className="sidebar-header">📊 アクセスカウンタ</div>
        <div className="sidebar-content">
          <div className="access-counter">
            <div className="counter-display">{accessCount}</div>
            <div className="counter-text">
              あなたは{accessCount}人目の<br />
              バカ仲間です！
            </div>
          </div>
        </div>
      </div>

      {/* 今週の要注意 */}
      {warningDrama && (
        <div className="sidebar-section warning-section">
          <div className="sidebar-header">⚠️ 今週の要注意</div>
          <div className="sidebar-content">
            <div className="warning-drama">
              <div className="sparkle">{warningDrama.title}</div>
              <div className="warning-level">
                {formatBakaLevel(warningDrama.averageBakaLevel)}(廃人確定)
              </div>
              <div className="warning-notice">
                完全にヤバいです。<br />
                視聴注意！！！
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 廃人度ランキング */}
      <div className="sidebar-section ranking-section">
        <div className="sidebar-header">🏆 廃人度ランキング</div>
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

      {/* 今週のバズドラマ（元からの右側項目） */}
      <div className="sidebar-section buzz-section">
        <div className="sidebar-header">🔥 今週のバズドラマ</div>
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
      
      {/* バカ度診断（元からの右側項目） */}
      <div className="sidebar-section diagnosis-section">
        <div className="sidebar-header">🧠 バカ度診断</div>
        <div className="sidebar-content">
          あなたのドラマ依存度は？<br />
          10個の質問で判定！<br /><br />
          <Link href="/baka-check" className="button-link">診断スタート</Link>
        </div>
      </div>
      
      {/* 相互リンク（元からの右側項目） */}
      <div className="sidebar-section links-section">
        <div className="sidebar-header">🔗 相互リンク</div>
        <div className="sidebar-content">
          <a href="#" className="external-link">ドラマ好きの集い</a><br />
          <a href="#" className="external-link">テレビっ子広場</a><br />
          <a href="#" className="external-link">深夜ドラマ愛好会</a><br />
          <a href="#" className="external-link">月9中毒者の会</a><br />
          <br />
          <Link href="/link">リンク集 &gt;&gt;</Link>
        </div>
      </div>
      
      {/* 管理人について（元からの右側項目） */}
      <div className="sidebar-section admin-section">
        <div className="sidebar-header">👤 管理人について</div>
        <div className="sidebar-content">
          <div className="admin-info">
            <div><strong>HN</strong>：廃人1号</div>
            <div><strong>年齢</strong>：40代</div>
            <div><strong>職業</strong>：会社員(仮)</div>
            <div><strong>趣味</strong>：ドラマ鑑賞</div>
            <div><strong>特技</strong>：録画予約</div>
            <div><strong>座右の銘</strong>：<br />「ドラマは人生だ」</div>
            <br />
            <a href="mailto:admin@dramabaka.com" className="contact-link">📧 連絡先</a>
          </div>
        </div>
      </div>
    </div>
  )
}