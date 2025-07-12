import { Podcast } from "@/types/podcast"

export const fetchPodcasts = async (term: string): Promise<Podcast[]> => {
  const res = await fetch(`${process.env.API_URL}/search/${term}`, {
    cache: 'no-store',
  })
  return res.json()
}

export const fetchSuggested = async (term: string): Promise<Podcast[]> => {
  const res = await fetch(`${process.env.API_URL}/suggested-episodes/${term}`, {
    cache: 'no-store',
  })
  return res.json()
}