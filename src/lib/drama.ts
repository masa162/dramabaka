import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { DramaDetail } from './types'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getDramaBySlug(slug: string[]): Promise<DramaDetail | null> {
  try {
    const filePath = path.join(contentDirectory, 'years', ...slug) + '.md'
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const urlPath = `/drama/${slug.join('/')}`
    const imagePath = `/images/dramas/${slug.join('/')}.jpg`
    
    const drama: DramaDetail = {
      title: data.title || '',
      slug: data.slug || '',
      english_title: data.english_title,
      broadcaster: data.broadcaster || '',
      genre: data.genre || '',
      season: data.season || 'winter',
      year: data.year || 2025,
      timeslot: data.timeslot || '',
      air_start: data.air_start || '',
      air_end: data.air_end,
      total_episodes: data.total_episodes || 0,
      episode_length: data.episode_length || 0,
      production: {
        script: data.production?.script || [],
        director: data.production?.director || [],
        producer: data.production?.producer || [],
        music: data.production?.music,
        production_company: data.production?.production_company || '',
      },
      cast: {
        main: data.cast?.main || [],
        supporting: data.cast?.supporting || [],
      },
      synopsis: data.synopsis || '',
      content: content,
      initial_baka_level: data.initial_baka_level || 1,
      warning_flags: data.warning_flags || [],
      tags: data.tags || [],
      categories: data.categories || [],
      status: data.status || 'upcoming',
      created_at: data.created_at || '',
      updated_at: data.updated_at || '',
      author: data.author || '',
      filePath: filePath,
      urlPath: urlPath,
      imagePath: imagePath,
    }
    
    return drama
  } catch (error) {
    console.error('Error fetching drama:', error)
    return null
  }
}

export async function getAllDramas(): Promise<DramaDetail[]> {
  const dramas: DramaDetail[] = []
  
  try {
    const yearsDir = path.join(contentDirectory, 'years')
    
    if (!fs.existsSync(yearsDir)) {
      return dramas
    }
    
    const years = fs.readdirSync(yearsDir)
    
    for (const year of years) {
      const yearPath = path.join(yearsDir, year)
      if (!fs.statSync(yearPath).isDirectory()) continue
      
      const seasons = fs.readdirSync(yearPath)
      
      for (const season of seasons) {
        const seasonPath = path.join(yearPath, season)
        if (!fs.statSync(seasonPath).isDirectory()) continue
        
        const broadcasters = fs.readdirSync(seasonPath)
        
        for (const broadcaster of broadcasters) {
          const broadcasterPath = path.join(seasonPath, broadcaster)
          if (!fs.statSync(broadcasterPath).isDirectory()) continue
          
          const genres = fs.readdirSync(broadcasterPath)
          
          for (const genre of genres) {
            const genrePath = path.join(broadcasterPath, genre)
            if (!fs.statSync(genrePath).isDirectory()) continue
            
            const files = fs.readdirSync(genrePath)
            
            for (const file of files) {
              if (file.endsWith('.md')) {
                const slug = [year, season, broadcaster, genre, file.replace('.md', '')]
                const drama = await getDramaBySlug(slug)
                if (drama) {
                  dramas.push(drama)
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching all dramas:', error)
  }
  
  return dramas
}

export async function getAllDramaSlugs(): Promise<string[][]> {
  const slugs: string[][] = []
  
  try {
    const yearsDir = path.join(contentDirectory, 'years')
    
    if (!fs.existsSync(yearsDir)) {
      return slugs
    }
    
    const years = fs.readdirSync(yearsDir)
    
    for (const year of years) {
      const yearPath = path.join(yearsDir, year)
      if (!fs.statSync(yearPath).isDirectory()) continue
      
      const seasons = fs.readdirSync(yearPath)
      
      for (const season of seasons) {
        const seasonPath = path.join(yearPath, season)
        if (!fs.statSync(seasonPath).isDirectory()) continue
        
        const broadcasters = fs.readdirSync(seasonPath)
        
        for (const broadcaster of broadcasters) {
          const broadcasterPath = path.join(seasonPath, broadcaster)
          if (!fs.statSync(broadcasterPath).isDirectory()) continue
          
          const genres = fs.readdirSync(broadcasterPath)
          
          for (const genre of genres) {
            const genrePath = path.join(broadcasterPath, genre)
            if (!fs.statSync(genrePath).isDirectory()) continue
            
            const files = fs.readdirSync(genrePath)
            
            for (const file of files) {
              if (file.endsWith('.md')) {
                const slug = [year, season, broadcaster, genre, file.replace('.md', '')]
                slugs.push(slug)
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching drama slugs:', error)
  }
  
  return slugs
}