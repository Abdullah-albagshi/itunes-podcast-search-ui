'use server';
import { PodcastListRenderer } from './PodcastListRenderer';
import { fetchPodcasts } from '@/app/service/api';
import { NoResult } from '@/components/NoResult';

interface PodcastListProps {
	query: string;
}

export default async function PodcastList({ query }: PodcastListProps) {
	if (!query) return null;

	const podcasts = await fetchPodcasts(query);

	if (podcasts.length === 0) return <NoResult />;

	return (
		<PodcastListRenderer podcasts={podcasts} title={"Top podcasts for " + query} />
	);
}
