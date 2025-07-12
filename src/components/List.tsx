'use client';

import React, { useRef, useState } from 'react';
import { Scrollbar } from './Scrollbar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';

export type Layout = 'scroll' | 'grid' | 'list' | 'compact';

interface ListProps<T> {
	items: T[];
	renderItem: (item: T, idx: number, layout: Layout) => React.ReactNode;
	allowedLayouts: Layout[];
	defaultLayout?: Layout;
	title?: string;
}

export function List<T>({
	items,
	renderItem,
	allowedLayouts,
	defaultLayout = 'scroll',
	title,
}: ListProps<T>) {
	const [layout, setLayout] = useState<Layout>(defaultLayout);
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleScroll = (dir: 'left' | 'right') => {
		if (scrollRef.current) {
			const amount = scrollRef.current.offsetWidth * 0.5;
			scrollRef.current.scrollBy({
				left: dir === 'left' ? -amount : amount,
				behavior: 'smooth',
			});
		}
	};

	return (
		<div className='w-full mb-10'>
			{/* Layout Switcher */}
			<div className='flex items-center mb-3 h-10 gap-2 justify-between border-b border-gray-800 pb-3 sticky top-[50px] bg-dark/95 backdrop-blur-sm z-10'>
				{title && <h2 className='text-base font-semibold'>{title}</h2>}
				<div className='flex items-center justify-end flex-1 gap-2 controls mxs-auto'>
					{layout === 'scroll' && (
						<div className='flex items-center gap-2'>
							<button
								onClick={() => handleScroll('left')}
								className='p-2 rounded-full hover:bg-[#21223b] hover:text-white text-gray-400 transition-colors duration-200 cursor-pointer'
							>
								<ChevronLeft className='w-4 h-4' />
							</button>
							<button
								onClick={() => handleScroll('right')}
								className='p-2 rounded-full hover:bg-[#21223b] hover:text-white text-gray-400 transition-colors duration-200 cursor-pointer'
							>
								<ChevronRight className='w-4 h-4' />
							</button>
						</div>
					)}

					<DropdownMenu>
						<DropdownMenuTrigger>
							<EllipsisVertical className='w-4 h-4 cursor-pointer' />
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side='bottom'
							align='end'
							className='bg-gradient-to-br from-[#404080] to-[#6B4080] text-white border-none'
						>
							{allowedLayouts
								.filter((opt) => opt !== layout)
								.map((opt) => (
									<DropdownMenuItem
										key={opt}
										onClick={() => setLayout(opt)}
										className='h-10 text-white cursor-pointer hover:bg-black/15 min-w-50'
									>
										Switch Layout to {opt}
									</DropdownMenuItem>
								))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{layout === 'scroll' ? (
				<div className='relative w-full overflow-hidden group'>
					<div
						ref={scrollRef}
						className='flex gap-3 pb-6 overflow-x-auto scroll-smooth scrollbar-hide'
						style={{ WebkitOverflowScrolling: 'touch' }}
					>
						{/* left tint */}
						<div
							className={`absolute left-[-5px] top-0 bottom-5 w-5 z-10`}
							style={{
								background:
									'linear-gradient(to right, hsla(238, 27%, 12%, 100%), hsla(238, 27%, 12%, 0%))',
							}}
						></div>
						{items.map((item, idx) => renderItem(item, idx, layout))}
						{/* right tint */}
						<div
							className='absolute top-0 right-0 z-10 w-5 bottom-5'
							style={{
								background:
									'linear-gradient(to right, hsla(238, 27%, 12%, 0%), hsla(238, 27%, 12%, 100%))',
							}}
						></div>
					</div>
					<div className='absolute bottom-0 left-0 right-0'>
						<Scrollbar
							containerRef={scrollRef}
							orientation='horizontal'
							className='transition-transform duration-100 origin-center scale-y-25 group-hover:scale-y-100'
						/>
					</div>
				</div>
			) : layout === 'grid' ? (
				<div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
					{items.map((item, idx) => renderItem(item, idx, layout))}
				</div>
			) : layout === 'list' ? (
				<div className='flex flex-col gap-2'>
					{items.map((item, idx) => renderItem(item, idx, layout))}
				</div>
			) : layout === 'compact' ? (
				<div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2'>
					{items.map((item, idx) => renderItem(item, idx, layout))}
				</div>
			) : null}
		</div>
	);
}
