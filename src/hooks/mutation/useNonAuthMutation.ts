import { useMutation } from "@tanstack/react-query";

import { CommonError } from "@/utils/CommonError";

interface Props {
    url: string;
    method: "POST" | "PUT" | "DELETE";
    isFormData?: boolean;
    hasReturnType: boolean;
}

export function useNonAuthMutation<T>({ url, method, isFormData, hasReturnType }: Props) {
    async function fetcher(body?: XMLHttpRequestBodyInit) {
      try {  
        const headers: HeadersInit = {};
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
          return (await response.json()) as T;
        }
      } catch (error) {
        if (error instanceof CommonError) {
            throw error;
        } else {
          throw new Error(String(error));
        }
      }
    }

    return useMutation({
        mutationFn: (body?: XMLHttpRequestBodyInit) => fetcher(body)
    })
}