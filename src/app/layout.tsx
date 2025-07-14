import './globals.css'
import Header from '@/components/layout/Header'
import RightSidebar from '@/components/layout/RightSidebar'
import Footer from '@/components/layout/Footer'

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
      <body>
        <Header />

        <div className="main-container">
          <div className="main-layout">
            <main className="main-content">
              {children}
            </main>
            
            <RightSidebar />
          </div>
        </div>
        
        <Footer />
      </body>
    </html>
  )
}