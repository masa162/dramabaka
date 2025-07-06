import { FC } from 'react'

interface BakaRatingProps {
  level: number
  warnings: string[]
}

const BakaRating: FC<BakaRatingProps> = ({ level, warnings }) => {
  const getBakaEmoji = (level: number) => {
    const emojis = ['', '🧠', '🧠🧠', '🧠🧠🧠', '🧠🧠🧠🧠', '🧠🧠🧠🧠🧠']
    return emojis[level] || ''
  }
  
  const getBakaLabel = (level: number) => {
    const labels = ['', 'まだ正気', 'ちょっとヤバい', '沼が見えてきた', 'もう戻れない', '完全に廃人']
    return labels[level] || ''
  }
  
  return (
    <div className="baka-rating-box retro-warning-box">
      <div className="content-header">
        🧠 バカ度判定
      </div>
      <div className="content-body">
        <div className="baka-level">
          <div className="baka-emoji" style={{ fontSize: '24px', marginBottom: '8px' }}>
            {getBakaEmoji(level)}
          </div>
          <div className="baka-label" style={{ fontWeight: 'bold', fontSize: '14px', color: '#ff0000' }}>
            {getBakaLabel(level)}
          </div>
        </div>
        {warnings.length > 0 && (
          <div className="warning-flags" style={{ marginTop: '15px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' }}>
              ⚠️ 要注意ポイント
            </div>
            <ul style={{ fontSize: '11px', paddingLeft: '20px' }}>
              {warnings.map((warning, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default BakaRating