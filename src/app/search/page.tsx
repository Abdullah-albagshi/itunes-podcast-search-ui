import { SearchHeader } from '../../components/SearchHeader';
import PodcastList from './components/PodcastList';
import EpisodeList from './components/EpisodeList';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = (await searchParams)?.q || '';

  return (
    <main className="px-6 py-8 mx-auto text-white">
      <SearchHeader query={query} />
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Top podcasts for {query}</h2>
        <PodcastList query={query} />
      </section>
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Top episodes for {query}</h2>
        <EpisodeList query={query} />
      </section>
    </main>
  );
}
