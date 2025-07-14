import Link from 'next/link'

export default function Header() {
  return (
    <div className="header-table">
      <div className="header-cell">
        <Link href="/" className="header-link">
          <div className="site-title">ドラマバカ一代</div>
          <div className="site-subtitle">〜見すぎて頭おかしくなったヤツらの感想サイト〜</div>
        </Link>
      </div>
    </div>
  )
}