import { createContext, ReactNode, useState } from "react";

import { PostListContentType } from "@/types";

interface createContextType {
  data: PostListContentType[] | null;
  query: string;
  handleSetQuery: (arg: string) => void;
  handleSetData: (arg: PostListContentType[] | null) => void;
}

export const SearchContext = createContext<createContextType>({
  data: null,
  query: "",
  handleSetQuery: () => {},
  handleSetData: () => {},
});

interface Props {
  children: ReactNode;
}

export function SearchProvider({ children }: Props) {
  const [data, setData] = useState<PostListContentType[] | null>(null);
  const [query, setQuery] = useState("");

  const handleSetData = (newData: PostListContentType[] | null) => {
    setData(newData);
  };

  const handleSetQuery = (text: string) => {
    setQuery(text);
  };

  return (
    <SearchContext.Provider
      value={{ data, handleSetData, query, handleSetQuery }}
    >
      {children}
    </SearchContext.Provider>
  );
}
