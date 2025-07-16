import Link from 'next/link'
import { DramaMaster } from '@/lib/data/csv-parser'
import { SeasonArchive, groupDramasByDay, DAY_DISPLAY_MAP } from '@/lib/data/archives'
import { getIdBySlug } from '@/lib/data/drama-mapping'

interface SeasonDetailProps {
  seasonInfo: SeasonArchive
  dramas: DramaMaster[]
}

export default function SeasonDetail({ seasonInfo, dramas }: SeasonDetailProps) {
  const dayGroups = groupDramasByDay(dramas)

  return (
    <div>
      {/* 季節ヘッダー */}
      <div style={{
        background: 'linear-gradient(90deg, #ff6600, #ff9900)',
        color: 'white',
        padding: '20px',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <h2 style={{margin: '0 0 10px 0', fontSize: '24px'}}>
          {seasonInfo.year}年{seasonInfo.seasonDisplay}クール
        </h2>
        <div style={{fontSize: '14px', opacity: 0.9}}>
          全{seasonInfo.dramaCount}本 | 平均バカ度: {'🧠'.repeat(Math.round(seasonInfo.avgBakaLevel))} | 
          ID範囲: {seasonInfo.idRangeStart}-{seasonInfo.idRangeEnd}
        </div>
      </div>

      {/* 季節サマリー */}
      <div style={{
        border: '2px solid #ccc',
        borderRadius: '5px',
        padding: '15px',
        marginBottom: '20px',
        background: '#f9f9f9'
      }}>
        <h3 style={{margin: '0 0 10px 0', color: '#333'}}>🎯 シーズン総評</h3>
        <p style={{margin: '10px 0', lineHeight: '1.6'}}>{seasonInfo.summary}</p>
        
        <div style={{marginTop: '15px'}}>
          <strong>🏆 注目作品：</strong>
          {seasonInfo.topDramas.map((drama, index) => (
            <span key={index} style={{color: '#ff6600', fontWeight: 'bold'}}>
              {index > 0 && '、'}{drama}
            </span>
          ))}
        </div>
      </div>

      {/* 曜日別ドラマリスト */}
      <div>
        <h3 style={{
          background: '#0066cc',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          margin: '0 0 15px 0'
        }}>
          📺 番組一覧（曜日別）
        </h3>

        {Object.entries(dayGroups).map(([day, dayDramas]) => {
          if (dayDramas.length === 0) return null

          return (
            <div key={day} style={{marginBottom: '20px'}}>
              <h4 style={{
                background: '#009900',
                color: 'white',
                padding: '8px 15px',
                margin: '0 0 10px 0',
                fontSize: '16px',
                borderRadius: '3px'
              }}>
                {DAY_DISPLAY_MAP[day]}曜日 ({dayDramas.length}本)
              </h4>

              <div style={{paddingLeft: '20px'}}>
                {dayDramas.map(drama => {
                  const dramaId = getIdBySlug(drama.slug)
                  const href = dramaId ? `/drama/${dramaId}` : `/drama/${drama.year}/${drama.season}/${drama.broadcaster.toLowerCase()}/${drama.genre}/${drama.slug}`

                  return (
                    <div key={drama.id} style={{
                      border: '1px solid #ddd',
                      borderRadius: '3px',
                      padding: '10px',
                      margin: '8px 0',
                      background: 'white'
                    }}>
                      <div style={{marginBottom: '5px'}}>
                        <Link 
                          href={href}
                          style={{
                            color: '#0000ff',
                            textDecoration: 'none',
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }}
                        >
                          {drama.title}
                        </Link>
                        <span style={{
                          marginLeft: '10px',
                          fontSize: '12px',
                          color: '#666'
                        }}>
                          ID: {drama.id}
                        </span>
                      </div>
                      
                      <div style={{fontSize: '13px', color: '#666', marginBottom: '5px'}}>
                        {drama.broadcaster} {drama.timeslot} | {drama.genre} | {drama.status}
                      </div>
                      
                      <div style={{fontSize: '12px', color: '#333'}}>
                        <strong>キャスト：</strong>{drama.cast.join('、')}
                      </div>
                      
                      {drama.synopsis && (
                        <div style={{fontSize: '11px', color: '#666', marginTop: '5px'}}>
                          {drama.synopsis}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* ナビゲーション */}
      <div style={{
        textAlign: 'center',
        marginTop: '30px',
        padding: '20px',
        background: '#f0f0f0',
        borderRadius: '5px'
      }}>
        <Link href="/archives" className="button-link" style={{marginRight: '10px'}}>
          &lt;&lt; アーカイブに戻る
        </Link>
        <Link href="/dramas" className="button-link" style={{marginRight: '10px'}}>
          📺 今季ドラマ一覧
        </Link>
        <Link href="/" className="button-link">
          🏠 HOME
        </Link>
      </div>
    </div>
  )
}