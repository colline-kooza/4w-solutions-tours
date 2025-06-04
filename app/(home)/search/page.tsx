import { Suspense } from "react"
import { Search } from "lucide-react"
import SearchResults from "@/components/frontend/search-results"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams.q || ""

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>

        {query ? (
          <>
            <p className="text-gray-500 mb-8">
              Showing results for <span className="font-medium">"{query}"</span>
            </p>

            <Suspense fallback={<SearchResultsSkeleton />}>
              <SearchResults query={query} />
            </Suspense>
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">No search query provided</h2>
            <p className="text-gray-500">Please enter a search term to find tours and destinations</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow p-4 flex gap-4">
          <div className="w-40 h-28 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-24 mt-4 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )
}