import { CircleOff } from 'lucide-react';

export const NoResult = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-4 h-60'>
			<div className='w-10 h-10'>
				<CircleOff className='w-10 h-10' />
			</div>
			<p className='text-sm text-gray-400'>No results found</p>
		</div>
	);
};
