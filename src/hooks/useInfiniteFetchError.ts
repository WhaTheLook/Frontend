import { useEffect, useState } from "react";

interface Props {
  isFetchNextPageError: boolean;
  isFetchingNextPage: boolean;
}

export function useInfiniteFetchError({ isFetchNextPageError, isFetchingNextPage }: Props) {
  const [shouldHandleError, setShouldHandleError] = useState(false);

  const resetHandleError = () => {
    setShouldHandleError(false);
  }

  useEffect(() => {
    function handleDataFetchError(isFetchError: boolean, isFetching: boolean) {
      if (isFetchError && !isFetching) {
        setShouldHandleError(true);
      }
    }

    handleDataFetchError(isFetchNextPageError, isFetchingNextPage);
  }, [isFetchingNextPage, isFetchNextPageError]);

  return { shouldHandleError, resetHandleError };
}
