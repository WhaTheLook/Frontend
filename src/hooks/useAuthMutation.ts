import { CommonError } from "@/utils/CommonError";
import { getLocalStorageItem } from "@/utils";
import { ACCESS_TOKEN } from "@/constants";

interface Props {
  url: string;
  method: "POST" | "PUT" | "DELETE";
  body: XMLHttpRequestBodyInit;
  isFormData?: boolean;
}

export function useAuthMutation({ url, method, body, isFormData }: Props) {
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
        throw error;
      } else {
        throw new Error(String(error));
      }
    }
  }

  return { fetcher };
}
