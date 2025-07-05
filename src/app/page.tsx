import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* ヘッダー */}
      <div className="header-table">
        <div className="header-cell">
          <div className="site-title">ドラマバカ一代</div>
          <div className="site-subtitle">〜見すぎて頭おかしくなったヤツらの感想サイト〜</div>
        </div>
      </div>
      
      {/* メニュー */}
      <div className="menu-table">
        <div className="menu-row">
          <div className="menu-cell"><Link href="/">HOME</Link></div>
          <div className="menu-cell"><Link href="/dramas">ドラマ一覧</Link></div>
          <div className="menu-cell"><Link href="/ranking">ランキング</Link></div>
          <div className="menu-cell"><Link href="/baka-check">バカ度診断</Link></div>
          <div className="menu-cell"><Link href="/review">感想投稿</Link></div>
          <div className="menu-cell"><Link href="/bbs">掲示板</Link></div>
          <div className="menu-cell"><Link href="/link">リンク集</Link></div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="main-container">
        <div className="main-table">
          {/* 左サイドバー */}
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
          
          {/* メインコンテンツ */}
          <div className="center-column">
            {/* 緊急告知 */}
            <div className="warning-box">
              <div className="warning-text blink">
                ★☆★緊急告知★☆★
              </div>
              「九龍城塞の恋人」視聴により廃人続出！！<br />
              視聴は計画的に...
            </div>
            
            {/* 管理人挨拶 */}
            <div className="content-section">
              <div className="content-header">★★★ようこそ！ドラマバカ一代へ★★★</div>
              <div className="content-body">
                こんにちは、管理人の廃人1号です。<br /><br />
                ここは<b>見すぎて頭おかしくなった</b>ドラマ好きが集う場所です。<br />
                地上波ドラマにハマりすぎて仕事も家事も手につかない...<br />
                そんなバカな皆さんの感想をお待ちしてます！<br /><br />
                
                <div className="marquee-text">★新規メンバー募集中！一緒にバカになりませんか？★</div>
                
                <br /><br />
                <Link href="/baka-check" className="button-link">あなたのバカ度チェック！</Link>
                <Link href="/review" className="button-link">感想を投稿する</Link>
              </div>
            </div>
            
            {/* 最新の感想 */}
            <div className="content-section">
              <div className="content-header">◆最新のバカ感想◆</div>
              <div className="content-body">
                <div className="review-item">
                  <div className="review-drama">トリリオンゲーム<span className="new-icon">NEW</span></div>
                  <div className="review-rating">★★★(沼が見えてきた)</div>
                  <div className="review-comment">
                    毎回ドキドキが止まらない...もう仕事が手につかない。<br />
                    録画を3回見直してしまった自分がヤバい
                  </div>
                  <div className="review-meta">投稿者：バカ仲間A　2025/07/05 18:30</div>
                </div>
                
                <div className="review-item">
                  <div className="review-drama">不適切にもほどがある！<span className="hot-icon">HOT</span></div>
                  <div className="review-rating">★★★★(もう戻れない)</div>
                  <div className="review-comment">
                    昭和と令和が混在する世界観にハマりすぎて危険。<br />
                    阿部サダヲの演技に完全にやられました...
                  </div>
                  <div className="review-meta">投稿者：沼民B　2025/07/05 17:45</div>
                </div>
                
                <div className="review-item">
                  <div className="review-drama">アンメット ある脳外科医の日記<span className="hot-icon">HOT</span></div>
                  <div className="review-rating">★★★★★(完全に廃人)</div>
                  <div className="review-comment">
                    医療ドラマなのに恋愛要素で完全に沼落ち。<br />
                    杉咲花ちゃんが可愛すぎて生きるのが辛い...助けて
                  </div>
                  <div className="review-meta">投稿者：廃人C　2025/07/05 16:20</div>
                </div>
                
                <div style={{textAlign: 'right', marginTop: '10px'}}>
                  <Link href="/reviews" className="button-link">もっと見る &gt;&gt;</Link>
                </div>
              </div>
            </div>
            
            {/* お知らせ */}
            <div className="content-section">
              <div className="content-header">◆管理人からのお知らせ◆</div>
              <div className="content-body">
                <b>2025/07/05</b> - 九龍城塞の恋人レビュー急増により一時的にサーバーが重くなる可能性があります<br />
                <b>2025/07/03</b> - バカ度診断機能を追加しました！<br />
                <b>2025/07/01</b> - 掲示板を設置しました。愚痴り放題です<br />
                <b>2025/06/28</b> - ドラマバカ一代オープン！よろしくお願いします<br />
              </div>
            </div>
          </div>
          
          {/* 右サイドバー */}
          <div className="right-column">
            <div className="sidebar-section">
              <div className="sidebar-header">今週のバズドラマ</div>
              <div className="sidebar-content">
                <div className="ranking-item">
                  <span className="ranking-number">🥇</span>
                  <span className="ranking-title">九龍城塞の恋人</span>
                  <span className="ranking-score">156件</span>
                </div>
                <div className="ranking-item">
                  <span className="ranking-number">🥈</span>
                  <span className="ranking-title">不適切にも〜</span>
                  <span className="ranking-score">132件</span>
                </div>
                <div className="ranking-item">
                  <span className="ranking-number">🥉</span>
                  <span className="ranking-title">アンメット</span>
                  <span className="ranking-score">98件</span>
                </div>
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
        </div>
      </div>
      
      {/* フッター */}
      <div className="footer">
        Copyright (C) 2025 ドラマバカ一代 All Rights Reserved.<br />
        このサイトはリンクフリーです。相互リンク募集中！<br />
        <Link href="/terms">利用規約</Link> | <Link href="/privacy">プライバシーポリシー</Link> | <Link href="/contact">お問い合わせ</Link>
      </div>
    </>
  )
}