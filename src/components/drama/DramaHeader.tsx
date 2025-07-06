import { FC } from 'react'
import { DramaDetail } from '@/lib/types'

interface DramaHeaderProps {
  drama: DramaDetail
}

const DramaHeader: FC<DramaHeaderProps> = ({ drama }) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'airing': return '放送中'
      case 'ended': return '放送終了'
      case 'upcoming': return '放送予定'
      case 'cancelled': return '放送中止'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'airing': return '#ff0000'
      case 'ended': return '#666666'
      case 'upcoming': return '#0066cc'
      case 'cancelled': return '#999999'
      default: return '#000000'
    }
  }

  return (
    <div className="drama-header-section content-section">
      <div className="content-header">
        📺 {drama.title}
      </div>
      <div className="content-body">
        <div className="drama-basic-info">
          {drama.english_title && (
            <div style={{ fontSize: '12px', color: '#666666', marginBottom: '8px' }}>
              {drama.english_title}
            </div>
          )}
          
          <div className="drama-meta-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'auto 1fr',
            gap: '8px',
            fontSize: '11px',
            lineHeight: '1.4'
          }}>
            <div style={{ fontWeight: 'bold' }}>放送局:</div>
            <div>{drama.broadcaster}</div>
            
            <div style={{ fontWeight: 'bold' }}>ジャンル:</div>
            <div>{drama.genre}</div>
            
            <div style={{ fontWeight: 'bold' }}>放送時間:</div>
            <div>{drama.timeslot}</div>
            
            <div style={{ fontWeight: 'bold' }}>放送期間:</div>
            <div>
              {drama.air_start}
              {drama.air_end && ` 〜 ${drama.air_end}`}
            </div>
            
            <div style={{ fontWeight: 'bold' }}>全話数:</div>
            <div>{drama.total_episodes}話 ({drama.episode_length}分)</div>
            
            <div style={{ fontWeight: 'bold' }}>ステータス:</div>
            <div style={{ 
              color: getStatusColor(drama.status),
              fontWeight: 'bold'
            }}>
              {getStatusLabel(drama.status)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DramaHeader