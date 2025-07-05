import Link from 'next/link'

export default function Footer() {
  return (
    <div className="footer">
      Copyright (C) 2025 ドラマバカ一代 All Rights Reserved.<br />
      このサイトはリンクフリーです。相互リンク募集中！<br />
      <Link href="/terms">利用規約</Link> | <Link href="/privacy">プライバシーポリシー</Link> | <Link href="/contact">お問い合わせ</Link>
    </div>
  )
}