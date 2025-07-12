'use server';
import { fetchSuggested } from '@/app/service/api';
import { EpisodeListRenderer } from './EpisodeListRenderer';

interface EpisodeListProps {
	query: string;
	title?: string;
}

export default async function EpisodeList({ query }: EpisodeListProps) {
	if (!query) return null;
	const episodes = await fetchSuggested(query);

	if (episodes.length === 0) return null;

	return <EpisodeListRenderer episodes={episodes} query={query} />;
}
