// PodcastCard.tsx
'use client';
import React from 'react';
import { Layout } from './List';
import { Podcast } from '@/types/podcast';
import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import clsx from 'clsx';

interface PodcastCardProps {
	podcast: Podcast;
	layout: Layout;
}

export function PodcastCard({ podcast, layout }: PodcastCardProps) {
	const getLayoutClasses = () => {
		switch (layout) {
			case 'scroll':
				return 'w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px] flex-shrink-0';
			case 'grid':
				return 'w-full';
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
				return 'aspect-square w-full';
			default:
				return 'aspect-square w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] xl:h-[280px]';
		}
	};

	const getContentClasses = () => {
		switch (layout) {
			case 'grid':
			case 'scroll':
				return 'flex-1 flex flex-row justify-between';
			default:
				return 'flex-1';
		}
	};

	const imageURL =
		podcast.artworkUrl100?.replace('100x100', '400x400') ||
		podcast.artworkUrl60?.replace('60x60', '400x400') ||
		podcast.artworkUrl30?.replace('30x30', '400x400');

	return (
		<div
			className={`rounded-lg flex flex-col  cursor-pointer ${getLayoutClasses()}`}
		>
			<div
				className={`${getImageClasses()} rounded mb-2 relative overflow-hidden`}
			>
				<img src={imageURL || ''} alt={podcast.trackName || 'Podcast Image'} />
			</div>
			<div className={getContentClasses()}>
				<div className='overflow-hidden'>
					<div className='mb-1 text-sm font-semibold text-white truncate hover:underline'>
						<Link href={podcast.trackViewUrl || ''} target='_blank'>
							{podcast.trackName || 'Podcast Title'}
						</Link>
					</div>
					<div className={clsx('text-sm truncate text-gray-400')}>
						{podcast.artistName || 'Author'}
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger className='w-4 h-6 text-gray-400 cursor-pointer hover:text-white'>
						<EllipsisVertical />
					</DropdownMenuTrigger>
					<DropdownMenuContent
						side='bottom'
						align='end'
						className='bg-gradient-to-br from-[#404080] to-[#6B4080] text-white border-none'
					>
						{podcast.trackViewUrl ? (
							<Link href={podcast.trackViewUrl} target='_blank'>
								<DropdownMenuItem className='h-10 text-white cursor-pointer hover:bg-black/15 min-w-50'>
									Go to Podcast
								</DropdownMenuItem>
							</Link>
						) : (
							<DropdownMenuItem className='h-10 text-white cursor-pointer hover:bg-black/15 min-w-50'>
								No link available
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
