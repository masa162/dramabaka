import { FC } from 'react'
import { DramaDetail } from '@/lib/types'
import DramaHeader from './DramaHeader'
import CastSection from './CastSection'
import ProductionInfo from './ProductionInfo'
import BakaRating from './BakaRating'

interface DramaDetailPageProps {
  drama: DramaDetail
}

const DramaDetailPage: FC<DramaDetailPageProps> = ({ drama }) => {
  return (
    <div className="drama-detail-container">
      <DramaHeader drama={drama} />
      
      {drama.synopsis && (
        <div className="content-section">
          <div className="content-header">
            📖 あらすじ
          </div>
          <div className="content-body">
            <div style={{ 
              fontSize: '12px', 
              lineHeight: '1.5',
              whiteSpace: 'pre-line'
            }}>
              {drama.synopsis}
            </div>
          </div>
        </div>
      )}
      
      <BakaRating level={drama.initial_baka_level} warnings={drama.warning_flags} />
      
      <CastSection drama={drama} />
      
      <ProductionInfo drama={drama} />
      
      {drama.content && (
        <div className="content-section">
          <div className="content-header">
            📝 詳細情報
          </div>
          <div className="content-body">
            <div 
              style={{ 
                fontSize: '12px', 
                lineHeight: '1.5' 
              }}
              dangerouslySetInnerHTML={{ 
                __html: drama.content.replace(/\n/g, '<br>') 
              }}
            />
          </div>
        </div>
      )}
      
      {drama.author && (
        <div style={{ 
          marginTop: '20px', 
          fontSize: '10px', 
          color: '#666666',
          textAlign: 'right'
        }}>
          記事作成: {drama.author}
          {drama.updated_at && (
            <span style={{ marginLeft: '10px' }}>
              最終更新: {new Date(drama.updated_at).toLocaleDateString('ja-JP')}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default DramaDetailPage