'use server'
import { List, Layout } from '../../../components/List';
import { EpisodeCard } from '../../../components/EpisodeCard';

interface EpisodeListProps {
  query: string;
}

export default async function EpisodeList({ query }: EpisodeListProps) {
  if (!query) return null;
  // const res = await fetch(`http://localhost:3000/search?term=${query}`, { cache: 'no-store' })
  // const episodes = await res.json()

  const allowedLayouts: Layout[] = ['scroll', 'grid', 'list', 'compact'];

  return (
    <></>
    // <List
    //   items={[]}
    //   renderItem={(episode, idx) => <EpisodeCard key={(episode as any).id || idx} episode={episode as any} />}
    //   allowedLayouts={allowedLayouts}
    // />
  );
} 