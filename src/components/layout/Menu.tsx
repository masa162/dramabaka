import Link from 'next/link'

export default function Menu() {
  return (
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
  )
}