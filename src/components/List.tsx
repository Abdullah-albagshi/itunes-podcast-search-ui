'use client';

import React, { useRef, useState } from 'react';
import { Scrollbar } from './Scrollbar';

export type Layout = 'scroll' | 'grid' | 'list' | 'compact';

interface ListProps<T> {
	items: T[];
	renderItem: (item: T, idx: number, layout: Layout) => React.ReactNode;
	allowedLayouts: Layout[];
	defaultLayout?: Layout;
	loading?: boolean;
}

export function List<T>({
	items,
	renderItem,
	allowedLayouts,
	defaultLayout = 'scroll',
	loading,
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
		<div className='w-full'>
			{/* Layout Switcher */}
			<div className='flex items-center mb-3 gap-2'>
				<select
					className='bg-gray-800 text-white rounded px-2 py-1 text-sm'
					value={layout}
					onChange={(e) => setLayout(e.target.value as Layout)}
				>
					{allowedLayouts.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
				{layout === 'scroll' && (
					<div className='flex items-center gap-2'>
						<button onClick={() => handleScroll('left')}>◀</button>
						<button onClick={() => handleScroll('right')}>▶</button>
					</div>
				)}
			</div>

			{/* Loading State */}
			{loading ? (
				<div className='py-8 flex justify-center items-center'>
					<span>Loading...</span>
				</div>
			) : layout === 'scroll' ? (
				<div className='relative w-full group overflow-hidden'>
					<div
						ref={scrollRef}
						className='flex overflow-x-auto gap-3 scroll-smooth pb-6 scrollbar-hide'
						style={{ WebkitOverflowScrolling: 'touch' }}
					>
						{/* left tint */}
						<div
							className='absolute left-0 top-0 bottom-5 w-5 z-10'
							style={{
								background:
									'linear-gradient(to right, hsla(238, 27%, 12%, 100%), hsla(238, 27%, 12%, 0%))',
							}}
						></div>
						{items.map((item, idx) => renderItem(item, idx, layout))}
						{/* right tinny scrollbar */}
						<div
							className='absolute right-0 top-0 bottom-5 w-5 z-10'
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
							className='transition-transform duration-100 scale-y-25 group-hover:scale-y-100 origin-center'
						/>
					</div>
				</div>
			) : layout === 'grid' ? (
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'>
					{items.map((item, idx) => renderItem(item, idx, layout))}
				</div>
			) : layout === 'list' ? (
				<div className='flex flex-col gap-3'>
					{items.map((item, idx) => renderItem(item, idx, layout))}
				</div>
			) : layout === 'compact' ? (
				<div className='flex flex-wrap gap-3'>
					{items.map((item, idx) => renderItem(item, idx, layout))}
				</div>
			) : null}
		</div>
	);
}
