'use client';

import { EpisodeCard } from '@/components/EpisodeCard';
import { Layout, List } from '@/components/List';
import { Episode } from '@/types/podcast';

export const EpisodeListRenderer = ({
	episodes,
	query,
}: {
	episodes: Episode[];
	query: string;
}) => {
	const allowedLayouts: Layout[] = ['scroll', 'grid', 'list', 'compact'];

	return (
		<List
			title={'Suggested episodes for ' + query}
			items={episodes}
			renderItem={(episode, idx, layout) => (
				<EpisodeCard
					key={episode.trackId || idx}
					episode={episode}
					layout={layout}
				/>
			)}
			allowedLayouts={allowedLayouts}
		/>
	);
};
