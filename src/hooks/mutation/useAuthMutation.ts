import { useMutation } from "@tanstack/react-query";

import { getLocalStorageItem } from "@/utils";
import { CommonError } from "@/utils/CommonError";
import { ACCESS_TOKEN } from "@/constants";

import { useLogout } from "../useLogout";
import { useReIssueToken } from "../useReIssueToken";

interface Props {
    url: string;
    method: "POST" | "PUT" | "DELETE";
    isFormData?: boolean;
    hasReturnType: boolean;
}

export function useAuthMutation<T>({ url, method, isFormData, hasReturnType }: Props) {
    const { reIssueTokenFetcher } = useReIssueToken();
    const { handleLogout } = useLogout();
  
    async function fetcher(body?: XMLHttpRequestBodyInit) {
      try {
        const accessToken = getLocalStorageItem(ACCESS_TOKEN);
  
        const headers: HeadersInit = {
          Authorization: `Bearer ${accessToken}`,
        };
        if (!isFormData) {
          headers["Content-Type"] = "application/json";
        }
  
        const response = await fetch(url, {
          method,
          headers,
          body,
        });
  
        if (!response.ok) {
          const { status } = response;
          throw new CommonError(status);
        }
  
        if (hasReturnType) { 
          const result = (await response.json()) as T;
          return result;
        }
      } catch (error) {
        if (error instanceof CommonError) {
          const { statusCode } = error;
          switch (statusCode) {
            case 401: 
              try {
                await reIssueTokenFetcher();
                return fetcher(body);
              } catch {
                handleLogout("tokenExpired");
              }
              break;
            default:
              throw error;
          }
        } else {
          throw new Error(String(error));
        }
      }
    }

    return useMutation({
        mutationFn: (body?: XMLHttpRequestBodyInit) => fetcher(body)
    })
}