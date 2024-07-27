import { MutableRefObject, useEffect, useState } from "react";

import { PostListType } from "@/types";

interface Props {
  url: string;
  sortType: number;
  currentPage: MutableRefObject<number>;
  intersecting: boolean;
}

export function useInfiniteFetch({ url, sortType, currentPage, intersecting }: Props) {
    const [data, setData] = useState<PostListType[]>([]);
    const [hasNext, setHasNext] = useState(true);

    async function fetcher() {
      const response = await fetch(url);

      const { content, nextPage } = await response.json();

      currentPage.current = nextPage;
      if (nextPage === null) {
        setHasNext(false);
      }
      
      setData((prev) => [...prev, ...content]);
    }


  useEffect(() => {
    if (intersecting && hasNext) {
      fetcher();
    }
  }, [hasNext, intersecting]);

  useEffect(() => {
    setData([]);
    setHasNext(true);
    currentPage.current = 0;
  }, [sortType, currentPage]);
    
    
  return data;
}