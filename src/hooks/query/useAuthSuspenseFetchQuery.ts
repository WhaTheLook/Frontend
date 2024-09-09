import { useSuspenseQuery } from "@tanstack/react-query";

import { ACCESS_TOKEN } from "@/constants";
import { getLocalStorageItem } from "@/utils";
import { CommonError } from "@/utils/CommonError";

import { useLogout } from "../useLogout";
import { useReIssueToken } from "../useReIssueToken";

interface Props {
  queryKey: string[];
  url: string;
  body?: XMLHttpRequestBodyInit;
  shouldTokenCheck: boolean;
}

export function useAuthSuspenseFetchQuery<T>({
  queryKey,
  url,
  body,
  shouldTokenCheck,
}: Props) {
  const { reIssueTokenFetcher } = useReIssueToken();
  const { handleLogout } = useLogout();

  const fetcher = async () => {
    try {
      const accessToken = getLocalStorageItem(ACCESS_TOKEN);
      const headers = {} as { Authorization?: string };

      if (shouldTokenCheck) {
        headers.Authorization = `Bearer ${accessToken}`;
      } else if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers,
        body,
      });

      if (!response.ok) {
        const { status } = response;
        throw new CommonError(status);
      }

      return response.json();
    } catch (error) {
      if (error instanceof CommonError) {
        const { statusCode } = error;
        switch (statusCode) {
          case 401:
            try {
              // 토큰 만료된 경우 재발급 후 다시 API 요청
              await reIssueTokenFetcher();
              return fetcher();
            } catch (error) {
              handleLogout("tokenExpired");
              return;
            }
          default:
            throw error;
        }
      } else {
        throw new Error(String(error));
      }
    }
  };

  const { data, isError, error, refetch } = useSuspenseQuery<T>({
    queryKey,
    queryFn: fetcher,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { data, isError, error, refetch };
}
