import { useEffect, useState } from "react";

import { ACCESS_TOKEN } from "@/constants";
import { getLocalStorageItem } from "@/utils";
import { CommonError } from "@/utils/CommonError";

import { useReIssueToken } from "@/hooks/useReIssueToken";

interface Props {
    url: string;
    body?: XMLHttpRequestBodyInit;
}

export function useAuthFetchSuspense<T>({ url, body }: Props) {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"pending" | "fulfilled" | "error">("pending");
    const [promise, setPromise] = useState<Promise<void>>();

    const { reIssueTokenFetcher } = useReIssueToken();

    async function fetcher() {
        try {
            const accessToken = getLocalStorageItem(ACCESS_TOKEN);
    
            const response = await fetch(url, {
                method: "GET", 
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body,
            });

            if (!response.ok) {
                const { status } = response;
                throw new CommonError(status);    
            }

            const result = await response.json();
            setData(result);
            setStatus("fulfilled");
        } catch(error) {
            setStatus("error");
            if (error instanceof CommonError) {
                const { statusCode } = error;
                switch (statusCode) {
                    case 401:
                        try {
                            // 토큰 만료된 경우 재발급 후 다시 API 요청
                            await reIssueTokenFetcher();
                            await fetcher();
                        } catch(error) {
                            return;
                        }
                        break;
                    case 403:
                        setError(error);
                        break;
                }
            } else {
                setError(new Error(String(error)));
            }
        }
    }
    
    useEffect(() => {
        setStatus("pending");
        setPromise(fetcher());
    }, []);
    
    if (status === "pending" && promise) {
        throw promise;
    }

    return { data, error };
}