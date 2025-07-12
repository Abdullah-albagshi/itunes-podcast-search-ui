import { SearchHeader } from '@/components/SearchHeader';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full px-6 mx-auto text-white">
      <SearchHeader />
      {children}
    </main>
  )
}
