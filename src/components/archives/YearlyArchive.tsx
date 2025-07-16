import Link from 'next/link'
import { YearlyArchive as YearlyArchiveType } from '@/lib/data/archives'

interface YearlyArchiveProps {
  archives: YearlyArchiveType[]
}

export default function YearlyArchive({ archives }: YearlyArchiveProps) {
  return (
    <div style={{margin: '30px 0 20px 0'}}>
      <h3 style={{
        background: 'linear-gradient(90deg, #009900, #00cc00)', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        📚 過去アーカイブ
      </h3>

      {archives.map(yearData => (
        <div key={yearData.year} className="yearly-archive" style={{
          border: '2px solid #ccc',
          borderRadius: '5px',
          margin: '15px 0',
          padding: '15px',
          background: '#f9f9f9'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            margin: '0 0 10px 0'
          }}>
            {yearData.year}年 (全{yearData.totalDramas}本)
          </h4>
          
          <div className="season-summary" style={{marginBottom: '10px'}}>
            <strong>年間ハイライト：</strong>
            {yearData.highlights.map((highlight, index) => (
              <span key={index}>
                {index > 0 && '、'}
                <span style={{color: '#ff6600', fontWeight: 'bold'}}>{highlight}</span>
              </span>
            ))}
          </div>

          <div className="seasons-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
            marginTop: '10px'
          }}>
            {yearData.seasons.map(season => (
              <div key={`${season.year}-${season.season}`} className="season-archive-card" style={{
                border: '1px solid #ddd',
                borderRadius: '3px',
                padding: '10px',
                background: 'white',
                fontSize: '12px'
              }}>
                <div style={{fontWeight: 'bold', marginBottom: '5px'}}>
                  {season.seasonDisplay} ({season.dramaCount}本)
                </div>
                <div style={{marginBottom: '5px'}}>
                  平均バカ度: <span style={{color: '#ff6600'}}>{'🧠'.repeat(Math.round(season.avgBakaLevel))}</span>
                </div>
                <div style={{marginBottom: '5px'}}>
                  <strong>注目作：</strong><br/>
                  {season.topDramas.slice(0, 2).join('、')}
                </div>
                <div style={{color: '#666', fontSize: '11px'}}>
                  {season.summary}
                </div>
                <div style={{marginTop: '8px', textAlign: 'center'}}>
                  <Link 
                    href={`/archives/${season.year}/${season.season}`}
                    style={{
                      color: '#0066cc',
                      textDecoration: 'none',
                      fontSize: '11px',
                      border: '1px solid #0066cc',
                      padding: '2px 8px',
                      borderRadius: '3px',
                      background: '#f0f8ff'
                    }}
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}