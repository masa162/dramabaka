import ContentSection from '@/components/common/ContentSection'
import { SAMPLE_DRAMAS } from '@/lib/data/dramas'
import { formatBakaLevel } from '@/lib/utils'
import Link from 'next/link'

export default function DramasPage() {
  return (
    <>
            <ContentSection title="◆地上波ドラマ一覧◆">
              <div style={{margin: '20px 0'}}>
                <h3>🔥 2025年冬クール</h3>
                
                {SAMPLE_DRAMAS.map(drama => (
                  <div key={drama.id} className="review-item">
                    <div className="review-drama">
                      <Link href={`/drama/2025/winter/${drama.broadcaster.toLowerCase()}/${drama.genre[0]}/${drama.slug}`} style={{color: '#0000ff'}}>
                        {drama.title}
                      </Link>
                      {drama.isWarning && <span className="hot-icon">要注意</span>}
                    </div>
                    <div className="review-rating">
                      バカ度：{formatBakaLevel(drama.averageBakaLevel)} | 
                      {drama.broadcaster} {drama.timeslot} | 
                      レビュー{drama.reviewCount}件
                    </div>
                    <div className="review-comment">
                      <strong>キャスト：</strong>{drama.cast.join('、')}<br />
                      <strong>ジャンル：</strong>{drama.genre.join('、')}<br />
                      {drama.synopsis}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{textAlign: 'center', marginTop: '20px'}}>
                <Link href="/" className="button-link">&lt;&lt; HOMEに戻る</Link>
              </div>
            </ContentSection>
    </>
  )
}