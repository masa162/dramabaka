import { FC } from 'react'
import { DramaDetail } from '@/lib/types'

interface CastSectionProps {
  drama: DramaDetail
}

const CastSection: FC<CastSectionProps> = ({ drama }) => {
  return (
    <div className="drama-cast-section content-section">
      <div className="content-header">
        🎭 キャスト
      </div>
      <div className="content-body">
        {drama.cast.main.length > 0 && (
          <div className="cast-group" style={{ marginBottom: '20px' }}>
            <div style={{ 
              fontWeight: 'bold', 
              fontSize: '12px', 
              marginBottom: '10px',
              color: '#ff0000'
            }}>
              主要キャスト
            </div>
            <div className="drama-cast-grid" style={{ 
              display: 'grid', 
              gap: '10px' 
            }}>
              {drama.cast.main.map((actor, index) => (
                <div key={index} style={{ 
                  border: '1px solid #cccccc',
                  padding: '8px',
                  backgroundColor: '#f8f8f8'
                }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    fontSize: '12px',
                    color: '#0000ff'
                  }}>
                    {actor.name}
                  </div>
                  <div style={{ 
                    fontSize: '11px',
                    color: '#666666',
                    margin: '4px 0'
                  }}>
                    {actor.character}役
                  </div>
                  <div style={{ 
                    fontSize: '11px',
                    lineHeight: '1.3'
                  }}>
                    {actor.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {drama.cast.supporting.length > 0 && (
          <div className="cast-group">
            <div style={{ 
              fontWeight: 'bold', 
              fontSize: '12px', 
              marginBottom: '10px',
              color: '#ff0000'
            }}>
              助演キャスト
            </div>
            <div className="drama-cast-grid" style={{ 
              display: 'grid', 
              gap: '10px' 
            }}>
              {drama.cast.supporting.map((actor, index) => (
                <div key={index} style={{ 
                  border: '1px solid #cccccc',
                  padding: '8px',
                  backgroundColor: '#f8f8f8'
                }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    fontSize: '12px',
                    color: '#0000ff'
                  }}>
                    {actor.name}
                  </div>
                  <div style={{ 
                    fontSize: '11px',
                    color: '#666666',
                    margin: '4px 0'
                  }}>
                    {actor.character}役
                  </div>
                  <div style={{ 
                    fontSize: '11px',
                    lineHeight: '1.3'
                  }}>
                    {actor.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CastSection