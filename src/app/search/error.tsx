'use client';

import Link from "next/link";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h2 className='text-2xl font-bold'>Something went wrong!</h2>
			<Link href='/search?q=' className='text-sm text-gray-500' onClick={() => reset()}>
				Try again.
			</Link>
		</div>
	);
}
