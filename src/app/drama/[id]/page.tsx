import { notFound } from 'next/navigation'
import DramaDetailPage from '@/components/drama/DramaDetailPage'
import { getDramaById, parseDramasCSV, DramaMaster } from '@/lib/data/csv-parser'
import { promises as fs } from 'fs'
import path from 'path'

interface Props {
  params: Promise<{ id: string }>
}

async function getDramasData(): Promise<DramaMaster[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/lib/data/dramas_master.csv')
    const csvContent = await fs.readFile(filePath, 'utf8')
    return parseDramasCSV(csvContent)
  } catch (error) {
    console.error('Error loading dramas data:', error)
    return []
  }
}

export default async function DramaPage({ params }: Props) {
  const { id } = await params
  const dramaId = parseInt(id)

  if (isNaN(dramaId)) {
    notFound()
  }

  const dramas = await getDramasData()
  const drama = getDramaById(dramas, dramaId)

  if (!drama) {
    notFound()
  }

  // DramaMasterからDramaDetail型に変換
  const dramaData = {
    title: drama.title,
    slug: drama.slug,
    english_title: '',
    broadcaster: drama.broadcaster,
    genre: drama.genre,
    season: drama.season,
    year: drama.year,
    timeslot: drama.timeslot,
    air_start: drama.airStart,
    air_end: drama.airEnd,
    total_episodes: 10, // デフォルト値
    episode_length: 60, // デフォルト値
    production: {
      script: [],
      director: [],
      producer: [],
      music: '',
      production_company: drama.broadcaster
    },
    cast: {
      main: [{
        name: drama.mainCast,
        character: '',
        description: ''
      }],
      supporting: []
    },
    synopsis: drama.mainCast, // 最小限に変更
    content: drama.mainCast,
    initial_baka_level: 3,
    warning_flags: drama.warningFlags ? [drama.warningFlags] : [],
    tags: drama.tags,
    categories: [drama.genre],
    status: (drama.status === 'completed' ? 'ended' : drama.status) as 'airing' | 'ended' | 'upcoming' | 'cancelled',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: 'system',
    filePath: '',
    urlPath: `/drama/${drama.id}`,
    imagePath: ''
  }

  return <DramaDetailPage drama={dramaData} />
}

export async function generateStaticParams() {
  const dramas = await getDramasData()
  
  return dramas.map((drama) => ({
    id: drama.id.toString(),
  }))
}