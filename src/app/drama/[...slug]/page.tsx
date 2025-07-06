import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDramaBySlug } from '@/lib/drama'
import DramaDetailPage from '@/components/drama/DramaDetailPage'

interface DramaPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: DramaPageProps): Promise<Metadata> {
  const drama = await getDramaBySlug(params.slug)
  
  if (!drama) {
    return {
      title: 'ドラマが見つかりません - ドラマバカ一代'
    }
  }
  
  return {
    title: `${drama.title} - ドラマバカ一代`,
    description: drama.synopsis || `${drama.title}の詳細情報。${drama.broadcaster}にて放送。`,
    openGraph: {
      title: `${drama.title} - ドラマバカ一代`,
      description: drama.synopsis || `${drama.title}の詳細情報。${drama.broadcaster}にて放送。`,
      type: 'article',
      publishedTime: drama.created_at,
      modifiedTime: drama.updated_at,
      authors: [drama.author],
      tags: drama.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${drama.title} - ドラマバカ一代`,
      description: drama.synopsis || `${drama.title}の詳細情報。${drama.broadcaster}にて放送。`,
    },
  }
}

export default async function DramaPage({ params }: DramaPageProps) {
  const drama = await getDramaBySlug(params.slug)
  
  if (!drama) {
    notFound()
  }
  
  return <DramaDetailPage drama={drama} />
}

export async function generateStaticParams() {
  return []
}