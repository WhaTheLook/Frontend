import { CommonError } from "@/utils/CommonError";
import { getLocalStorageItem } from "@/utils";
import { ACCESS_TOKEN } from "@/constants";

import { useReIssueToken } from "./useReIssueToken";
import { useLogout } from "./useLogout";

interface Props {
  url: string;
  method: "POST" | "PUT" | "DELETE";
  body?: XMLHttpRequestBodyInit;
  isFormData?: boolean;
}

export function useAuthMutation({ url, method, body, isFormData }: Props) {
  const { reIssueTokenFetcher } = useReIssueToken();
  const { handleLogout } = useLogout();

  async function fetcher() {
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

    } catch (error) {
      if (error instanceof CommonError) {
        const { statusCode } = error;
        switch (statusCode) {
          case 401: 
            try {
              await reIssueTokenFetcher();
              await fetcher();
            } catch {
              handleLogout("tokenExpired");
            }
            break;
          default:
            throw error;
            break;
        }
      } else {
        throw new Error(String(error));
      }
    }
  }

  return { fetcher };
}
