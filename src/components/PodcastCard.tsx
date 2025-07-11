// PodcastCard.tsx
'use client';
import React from 'react';
import { Layout } from './List';
import { Podcast } from '@/types/podcast';

interface PodcastCardProps {
	podcast: Podcast;
	layout: Layout;
}

export function PodcastCard({ podcast, layout }: PodcastCardProps) {
	const getLayoutClasses = () => {
		switch (layout) {
			case 'scroll':
        // hide scrollbar
				return 'w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px] flex-shrink-0';
			case 'grid':
				return 'w-full';
			case 'list':
				return 'w-full flex gap-4';
			case 'compact':
				return 'w-32 flex-shrink-0';
			default:
				return 'w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px] flex-shrink-0';
		}
	};

	// Consistent image dimensions across scroll and grid layouts
	const getImageClasses = () => {
		switch (layout) {
			case 'scroll':
			case 'grid':
				// Same aspect ratio and consistent height for both layouts
				return 'aspect-square w-full ';
			case 'list':
				return 'h-20 w-20 flex-shrink-0';
			case 'compact':
				return 'h-32 w-full';
			default:
				return 'aspect-square w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] xl:h-[280px]';
		}
	};

	const contentClasses = layout === 'list' ? 'flex-1' : '';

	const imageURL =
		podcast.artworkUrl100?.replace('100x100', '400x400') ||
		podcast.artworkUrl60?.replace('60x60', '400x400') ||
		podcast.artworkUrl30?.replace('30x30', '400x400');

	return (
		<div className={`rounded-lg flex flex-col ${getLayoutClasses()}`}>
			<div
				className={`${getImageClasses()} rounded mb-2 relative overflow-hidden`}
			>
				<img
					src={imageURL || ''}
					alt={podcast.trackName || 'Podcast Image'}
				/>
			</div>
			<div className={contentClasses}>
				<div className='font-semibold text-sm truncate mb-1 text-white'>
					{podcast.trackName || 'Podcast Title'}
				</div>
				<div className='text-sm text-gray-400 truncate'>
					{podcast.artistName || 'Author'}
				</div>
			</div>
		</div>
	);
}
