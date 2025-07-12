import { Podcast } from "@/types/podcast"

export const fetchPodcasts = async (term: string): Promise<Podcast[]> => {
  try {
    const res = await fetch(`${process.env.API_URL}/search/${term}`, {
      cache: 'no-store',
    })
    if(!res.ok) {
      throw new Error('Failed to fetch podcasts')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching podcasts:', error)
    return []
  }
}

export const fetchSuggested = async (term: string): Promise<Podcast[]> => {
  try {
    const res = await fetch(`${process.env.API_URL}/suggested-episodes/${term}`, {
      cache: 'no-store',
    })
    if(!res.ok) {
      throw new Error('Failed to fetch suggested episodes')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching suggested episodes:', error)
    return []
  }
}