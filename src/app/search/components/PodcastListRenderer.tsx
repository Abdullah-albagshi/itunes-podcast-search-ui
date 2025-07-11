'use client';

import { Podcast } from '@/types/podcast';
import { List, Layout } from '../../../components/List';
import { PodcastCard } from '../../../components/PodcastCard';

interface PodcastListRendererProps {
	podcasts: Podcast[];
	allowedLayouts: Layout[];
}

export function PodcastListRenderer({
	podcasts,
	allowedLayouts,
}: PodcastListRendererProps) {
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
		/>
	);
}
