'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


export function SearchHeader() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const q = searchParams.get('q') || '';
	const [input, setInput] = useState(q || '');

	useEffect(() => {
		const handler = setTimeout(() => {
			const currentQuery = searchParams.get('q') || '';
			if (input !== currentQuery) {
				const params = new URLSearchParams(searchParams.toString());
				if (input) {
					params.set('q', input);
				} else {
					params.delete('q');
				}
				router.replace(`?${params.toString()}`);
			}
		}, 500);

		return () => clearTimeout(handler);
	}, [input, router, searchParams]);

	return (
		<div className='flex items-center gap-2 w-full sticky top-0 py-2 h-[50px] bg-dark/95 backdrop-blur-sm z-20 '>
			<input
				className={`w-full h-9 px-4 py-2 rounded-[10px] bg-[hsla(238,27%,12%,50%)] 
          border border-white/25 text-white text-center 
          focus:outline-none focus:ring-1 focus:ring-[#7B7BF0] 
          focus:bg-white/5 focus:placeholder:text-white/0 focus:font-semibold
          placeholder:text-[#898990]`}
				type='text'
				placeholder='Search for podcasts...'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				aria-label='Search'
			/>
		</div>
	);
}
