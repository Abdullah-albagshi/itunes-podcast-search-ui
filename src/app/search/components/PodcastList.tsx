'use server';
import { Podcast } from '@/types/podcast';
import { Layout } from '../../../components/List';
import { PodcastListRenderer } from './PodcastListRenderer';

interface PodcastListProps {
	query: string;
}

export default async function PodcastList({ query }: PodcastListProps) {
	if (!query) return null;

	const res = await fetch(`http://localhost:3000/api/v1/itunes/search/${query}`, {
		cache: 'no-store',
	});
	const podcasts = await res.json() as Podcast[];
	const allowedLayouts: Layout[] = ['scroll', 'grid'];

	return (
		<PodcastListRenderer podcasts={podcasts} allowedLayouts={allowedLayouts} />
	);
}
