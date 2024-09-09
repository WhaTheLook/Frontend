import { createContext, ReactNode, useState } from "react";

import { PostListContentType } from "@/types";

interface createContextType {
  data: PostListContentType[] | null;
  query: string;
  totalCount: number;
  handleSetQuery: (arg: string) => void;
  handleSetData: (arg: PostListContentType[] | null, total: number) => void;
}

export const SearchContext = createContext<createContextType>({
  data: null,
  query: "",
  totalCount: 0,
  handleSetQuery: () => {},
  handleSetData: () => {},
});

interface Props {
  children: ReactNode;
}

export function SearchProvider({ children }: Props) {
  const [data, setData] = useState<PostListContentType[] | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [query, setQuery] = useState("");

  const handleSetData = (
    newData: PostListContentType[] | null,
    total: number
  ) => {
    setData(newData);
    setTotalCount(total);
  };

  const handleSetQuery = (text: string) => {
    setQuery(text);
  };

  return (
    <SearchContext.Provider
      value={{ data, handleSetData, query, handleSetQuery, totalCount }}
    >
      {children}
    </SearchContext.Provider>
  );
}
