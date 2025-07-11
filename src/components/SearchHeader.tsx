'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchHeaderProps {
  query: string;
}

export function SearchHeader({ query }: SearchHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [input, setInput] = useState(query || '');

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
    }, 300);

    return () => clearTimeout(handler);
  }, [input, router, searchParams]);

  return (
    <div className="flex items-center gap-2 w-full">
      <input
        className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Search for podcasts or episodes..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Search"
      />
    </div>
  );
}