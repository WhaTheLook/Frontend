import { useQuery } from "@tanstack/react-query";

import { getLocalStorageItem } from "@/utils";
import { ACCESS_TOKEN } from "@/constants";
import { CommonError } from "@/utils/CommonError";

import { useLogout } from "../useLogout";
import { useReIssueToken } from "../useReIssueToken";

interface Props {
    queryKey: string[];
    url: string;
    body?: XMLHttpRequestBodyInit;
    shouldTokenCheck: boolean;
    enabled?: boolean;
}

export function useAuthFetchQuery<T>({ queryKey, url, body, shouldTokenCheck, enabled = true}: Props) {
    const { reIssueTokenFetcher } = useReIssueToken();
    const { handleLogout } = useLogout();

    const authQueryFn = async () => {
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
        } catch(error) {
          if (error instanceof CommonError) {
            const { statusCode } = error;
            switch (statusCode) {
              case 401:
                  try {
                    // 토큰 만료된 경우 재발급 후 다시 API 요청
                    await reIssueTokenFetcher();
                    return await authQueryFn();
                  } catch(error) {
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

    return useQuery<T>({
        queryKey,
        queryFn: authQueryFn,
        refetchOnWindowFocus: false,
        enabled,
    }) 
}