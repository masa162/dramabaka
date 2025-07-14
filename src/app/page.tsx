import WarningBox from '@/components/common/WarningBox'
import ContentSection from '@/components/common/ContentSection'
import ReviewItem from '@/components/common/ReviewItem'
import { SAMPLE_DRAMAS } from '@/lib/data/dramas'
import { SAMPLE_REVIEWS } from '@/lib/data/reviews'
import { getLatestLegacyReviews, formatBakaLevel, formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function Home() {
  const latestReviews = getLatestLegacyReviews(SAMPLE_REVIEWS, 3)
  const warningDrama = SAMPLE_DRAMAS.find(d => d.isWarning)

  return (
    <>
      {warningDrama && (
        <WarningBox>
          「{warningDrama.title}」視聴により廃人続出！！<br />
          視聴は計画的に...
        </WarningBox>
      )}
      
      <ContentSection title="★★★ようこそ！ドラマバカ一代へ★★★">
        こんにちは、管理人の廃人1号です。<br /><br />
        ここは<b>見すぎて頭おかしくなった</b>ドラマ好きが集う場所です。<br />
        地上波ドラマにハマりすぎて仕事も家事も手につかない...<br />
        そんなバカな皆さんの感想をお待ちしてます！<br /><br />
        
        <div className="marquee-text">★新規メンバー募集中！一緒にバカになりませんか？★</div>
        
        <br /><br />
        <Link href="/dramas" className="button-link">今季のドラマ一覧</Link>
        <Link href="/baka-check" className="button-link">あなたのバカ度チェック！</Link>
        <Link href="/ranking" className="button-link">バカ度ランキング</Link>
      </ContentSection>
      
      <ContentSection title="◆最新のバカ感想◆">
        {latestReviews.map(review => {
          const drama = SAMPLE_DRAMAS.find(d => d.id === review.dramaId)
          return (
            <ReviewItem
              key={review.id}
              drama={drama?.title || '不明なドラマ'}
              rating={formatBakaLevel(review.bakaLevel)}
              comment={review.oneLineComment}
              author={review.nickname}
              date={formatDate(review.createdAt)}
              isNew={review.isNew}
              isHot={review.isHot}
            />
          )
        })}
        
        <div style={{textAlign: 'right', marginTop: '10px'}}>
          <Link href="/reviews" className="button-link">もっと見る &gt;&gt;</Link>
        </div>
      </ContentSection>
      
      <ContentSection title="◆管理人からのお知らせ◆">
        <b>2025/07/05</b> - 九龍城塞の恋人レビュー急増により一時的にサーバーが重くなる可能性があります<br />
        <b>2025/07/03</b> - バカ度診断機能を追加しました！<br />
        <b>2025/07/01</b> - 掲示板を設置しました。愚痴り放題です<br />
        <b>2025/06/28</b> - ドラマバカ一代オープン！よろしくお願いします<br />
      </ContentSection>
    </>
  )
}