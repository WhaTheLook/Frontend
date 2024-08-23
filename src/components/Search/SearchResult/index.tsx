import { ApiErrorBoundary } from "@/components/common/ApiErrorBoundary";
import { SearchContainer } from "@/components/Search/SearchContainer";

import { SearchFetcher } from "@/fetcher/Search/SearchFetcher";

export function SearchResult() {
  return (
    <ApiErrorBoundary>
      <SearchFetcher>
        <SearchContainer />
      </SearchFetcher>
    </ApiErrorBoundary>
  );
}
