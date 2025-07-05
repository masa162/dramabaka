import './globals.css'

export const metadata = {
  title: 'ドラマバカ一代 - 見すぎて頭おかしくなったヤツらの感想サイト',
  description: '地上波ドラマにハマりすぎた40代over↑の民度低い皆さんが集う2000年代風レビューサイト',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}