import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchBar } from "@/components/Search/SearchBar";
import { SearchContainer } from "@/components/Search/SearchContainer";
import { ApiErrorBoundary } from "@/components/common/ApiErrorBoundary";

import { SearchFetcher } from "@/fetcher/Search/SearchFetcher";

import { useSearchContext } from "@/hooks/useSearchContext";

import * as S from "./style";

export function Search() {
  const [searchParams] = useSearchParams();
  const paramsQuery = searchParams.get("search_query");
  const { query, handleSetQuery } = useSearchContext();

  useEffect(() => {
    if (paramsQuery) handleSetQuery(paramsQuery);
  }, [paramsQuery, handleSetQuery]);

  return (
    <S.Container>
      <SearchBar />
      <ApiErrorBoundary>
        {query !== "" && (
          <SearchFetcher>
            <SearchContainer />
          </SearchFetcher>
        )}
      </ApiErrorBoundary>
    </S.Container>
  );
}
