import Link from 'next/link'
import { DramaMaster } from '@/lib/data/csv-parser'
import { groupDramasByDay, DAY_DISPLAY_MAP } from '@/lib/data/archives'
import { getIdBySlug } from '@/lib/data/drama-mapping'

interface CurrentSeasonListProps {
  dramas: DramaMaster[]
  year: number
  season: string
}

export default function CurrentSeasonList({ dramas, year, season }: CurrentSeasonListProps) {
  const dayGroups = groupDramasByDay(dramas)
  const totalCount = dramas.length

  return (
    <div style={{margin: '20px 0'}}>
      <h3 style={{
        background: 'linear-gradient(90deg, #ff6600, #ff9900)', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        🔥 今シーズン ({year}年{season === 'winter' ? '冬' : season}) - {totalCount}本
      </h3>
      
      <div className="current-season-archive">
        {Object.entries(dayGroups).map(([day, dayDramas]) => {
          if (dayDramas.length === 0) return null
          
          return (
            <div key={day} className="archive-day-section" style={{marginBottom: '15px'}}>
              <h4 style={{
                background: '#0066cc',
                color: 'white',
                padding: '5px 10px',
                margin: '10px 0 5px 0',
                fontSize: '14px'
              }}>
                {DAY_DISPLAY_MAP[day]}曜日
              </h4>
              <div className="archive-drama-list" style={{paddingLeft: '15px'}}>
                {dayDramas.map(drama => {
                  const dramaId = getIdBySlug(drama.slug)
                  const href = dramaId ? `/drama/${dramaId}` : `/drama/${drama.year}/${drama.season}/${drama.broadcaster.toLowerCase()}/${drama.genre}/${drama.slug}`
                  
                  return (
                    <div key={drama.id} className="archive-drama-item" style={{margin: '3px 0'}}>
                      <Link 
                        href={href}
                        style={{color: '#0000ff', textDecoration: 'none'}}
                      >
                        {drama.title}
                      </Link>
                      <span style={{color: '#666', fontSize: '12px', marginLeft: '10px'}}>
                        ({drama.broadcaster} {drama.timeslot})
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}