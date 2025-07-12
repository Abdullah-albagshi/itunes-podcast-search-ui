'use client';
import React from 'react';
import { Layout } from './List';
import Link from 'next/link';
import { Episode } from '@/types/podcast';
import clsx from 'clsx';
import { EllipsisVertical } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { MillisToHoursMinutes } from '@/lib/utils';

interface EpisodeCardProps {
	episode: Episode;
	layout: Layout;
}

export function EpisodeCard({ episode, layout }: EpisodeCardProps) {
	const getLayoutClasses = () => {
		switch (layout) {
			case 'scroll':
			case 'grid':
				return 'flex-auto flex-row h-[110px]';
			case 'list':
				return 'w-full flex gap-4 flex-row pe-4';
			case 'compact':
				return 'flex-row gap-x-2 flex-shrink-0 flex-grow pe-4';
			default:
				return 'w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px] flex-shrink-0';
		}
	};

	const getImageClasses = () => {
		switch (layout) {
			case 'scroll':
			case 'grid':
				return 'aspect-square w-[110px] h-[110px]';
			case 'list':
				return 'h-20 w-20 flex-shrink-0';
			case 'compact':
				return 'h-12 w-12 flex-shrink-0';
			default:
				return 'aspect-square w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] xl:h-[280px]';
		}
	};

	const getContentClasses = () => {
		switch (layout) {
			case 'scroll':
				return 'flex-1 flex flex-row justify-between items-start overflow-hidden p-2 w-60 max-w-50 line-clamp-2';
			case 'grid':
				return 'flex-1 flex flex-row justify-between items-start overflow-hidden p-2';
			case 'list':
				return 'flex-1 flex flex-row justify-between items-center overflow-hidden';
			case 'compact':
				return 'flex-1 overflow-hidden flex flex-row justify-between items-center';
			default:
				return 'flex-1';
		}
	};

	const imageURL =
		episode.artworkUrl100?.replace('100x100', '400x400') ||
		episode.artworkUrl60?.replace('60x60', '400x400') ||
		episode.artworkUrl30?.replace('30x30', '400x400');

	return (
		<div
			className={clsx(
				'rounded-lg flex flex-col',
				getLayoutClasses(),
				'bg-black/10 rounded-lg hover:bg-black/30'
			)}
		>
			<div
				className={`${getImageClasses()} rounded mb-2 relative cursor-pointer`}
			>
				<img src={imageURL || ''} alt={episode.trackName || 'Episode Image'} />
			</div>
			<div className={getContentClasses()}>
				<div className='overflow-hidden '>
					<div
						className={clsx(
							'mb-1 overflow-hidden text-sm font-semibold text-white truncate text-wrap hover:underline line-clamp-2',
						)}
					>
						<Link href={episode.trackViewUrl || ''} target='_blank'>
							{episode.trackName || 'Episode Title'}
						</Link>
					</div>
					<div className={clsx('text-sm truncate text-gray-400')}>
						{episode.artistViewUrl ? (
							<Link
								href={episode.artistViewUrl}
								target='_blank'
								className='hover:underline'
							>
								{episode.artistName || ''}
							</Link>
						) : (
							episode.artistName || ''
						)}
					</div>
					{layout === 'list' && (
						<>
							{(episode.shortDescription || episode.description) && (
								<div className='text-sm text-gray-200 truncate '>
									{episode.shortDescription || episode.description}
								</div>
							)}
							{episode.trackTimeMillis && (
								<div className='text-sm truncate text-foreground '>
									{MillisToHoursMinutes(episode.trackTimeMillis)}
								</div>
							)}
						</>
					)}
				</div>
				<EpisodeDropdownMenu episode={episode} />
			</div>
		</div>
	);
}

const EpisodeDropdownMenu = ({ episode }: { episode: Episode }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='w-4 h-6 text-gray-400 cursor-pointer hover:text-white'>
				<EllipsisVertical />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				side='bottom'
				align='end'
				className='bg-gradient-to-br from-[#404080] to-[#6B4080] text-white border-none'
			>
				{episode.episodeUrl && (
					<Link href={episode.episodeUrl} target='_blank'>
						<DropdownMenuItem className='h-10 text-white cursor-pointer hover:bg-black/15 min-w-50'>
							Go to Episode
						</DropdownMenuItem>
					</Link>
				)}
				{episode.artistViewUrl && (
					<Link href={episode.artistViewUrl} target='_blank'>
						<DropdownMenuItem className='h-10 text-white cursor-pointer hover:bg-black/15 min-w-50'>
							Go to Artist
						</DropdownMenuItem>
					</Link>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
