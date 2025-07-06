import { FC } from 'react'
import { DramaDetail } from '@/lib/types'

interface ProductionInfoProps {
  drama: DramaDetail
}

const ProductionInfo: FC<ProductionInfoProps> = ({ drama }) => {
  return (
    <div className="drama-production-section content-section">
      <div className="content-header">
        🎬 制作情報
      </div>
      <div className="content-body">
        <div className="drama-production-info" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'auto 1fr',
          gap: '8px',
          fontSize: '11px',
          lineHeight: '1.4'
        }}>
          {drama.production.script.length > 0 && (
            <>
              <div style={{ fontWeight: 'bold' }}>脚本:</div>
              <div>{drama.production.script.join(', ')}</div>
            </>
          )}
          
          {drama.production.director.length > 0 && (
            <>
              <div style={{ fontWeight: 'bold' }}>演出:</div>
              <div>{drama.production.director.join(', ')}</div>
            </>
          )}
          
          {drama.production.producer.length > 0 && (
            <>
              <div style={{ fontWeight: 'bold' }}>プロデューサー:</div>
              <div>{drama.production.producer.join(', ')}</div>
            </>
          )}
          
          {drama.production.music && (
            <>
              <div style={{ fontWeight: 'bold' }}>音楽:</div>
              <div>{drama.production.music}</div>
            </>
          )}
          
          {drama.production.production_company && (
            <>
              <div style={{ fontWeight: 'bold' }}>制作:</div>
              <div>{drama.production.production_company}</div>
            </>
          )}
        </div>
        
        {drama.tags.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <div style={{ 
              fontWeight: 'bold', 
              fontSize: '11px', 
              marginBottom: '8px' 
            }}>
              🏷️ タグ
            </div>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '4px' 
            }}>
              {drama.tags.map((tag, index) => (
                <span key={index} style={{ 
                  backgroundColor: '#0066cc',
                  color: '#ffffff',
                  padding: '2px 6px',
                  fontSize: '10px',
                  borderRadius: '2px'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductionInfo