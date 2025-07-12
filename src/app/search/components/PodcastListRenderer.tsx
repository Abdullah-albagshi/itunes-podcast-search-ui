'use client';

import { Podcast } from '@/types/podcast';
import { List, Layout } from '../../../components/List';
import { PodcastCard } from '../../../components/PodcastCard';

interface PodcastListRendererProps {
	podcasts: Podcast[];
	title?: string;
}

export function PodcastListRenderer({
	podcasts,
	title,
}: PodcastListRendererProps) {
	const allowedLayouts: Layout[] = ['scroll', 'grid'];

	return (
		<List
			items={podcasts}
			renderItem={(podcast, idx, layout) => (
				<PodcastCard
					key={podcast.trackId || idx}
					podcast={podcast}
					layout={layout}
				/>
			)}
			allowedLayouts={allowedLayouts}
			title={title}
		/>
	);
}
