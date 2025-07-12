'use server';
import PodcastList from './components/PodcastList';
import EpisodeList from './components/EpisodeList';
import { Suspense } from 'react';
import { Loading } from '@/components/Loading';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const { q: query = '' } = await searchParams;

  if (!query) {
    return <div className='mt-10 text-sm text-center text-gray-400'>Type in a search term to start.</div>;
  }

  return (
    <div>
      <section className="mt-6">
        <Suspense fallback={<Loading/>}>
          <PodcastList query={query} />
        </Suspense>
      </section>

      <section className="mt-10">
        <Suspense fallback={<Loading/>}>
          <EpisodeList query={query} />
        </Suspense>
      </section>
    </div>
  );
}
