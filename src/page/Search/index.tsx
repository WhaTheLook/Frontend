import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchBar } from "@/components/Search/SearchBar";
import { SearchResult } from "@/components/Search/SearchResult";

import { useSearchContext } from "@/hooks/useSearchContext";

import * as S from "./style";

export function Search() {
  const [searchParams] = useSearchParams();
  const paramsQuery = searchParams.get("search_query");
  const { query, handleSetQuery } = useSearchContext();

  const hasQuery = query !== "";

  useEffect(() => {
    if (paramsQuery) {
      handleSetQuery(paramsQuery);
    }
  }, [paramsQuery, handleSetQuery]);

  return (
    <S.Container>
      <SearchBar />
      {hasQuery && <SearchResult />}
    </S.Container>
  );
}
