import { useCallback, useEffect, useMemo, useState } from "react";

import { ACCESS_TOKEN } from "@/constants";
import { getLocalStorageItem } from "@/utils";
import { CommonError } from "@/utils/CommonError";

import { useReIssueToken } from "@/hooks/useReIssueToken";
import { useLogout } from "./useLogout";

interface Props {
    url: string;
    body?: XMLHttpRequestBodyInit;
    shouldTokenCheck: boolean;
}

export function useAuthFetchSuspense<T>({ url, body, shouldTokenCheck }: Props) {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"pending" | "fulfilled" | "error">("pending");
    const [promise, setPromise] = useState<Promise<void>>();

    const { reIssueTokenFetcher } = useReIssueToken();
    const { handleLogout } = useLogout();

    const abortController = useMemo(() => new AbortController(), []);

    const fetcher = useCallback(async function fetcher() {
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
                signal: abortController.signal
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
                            handleLogout("tokenExpired");
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
    }, [body, handleLogout, reIssueTokenFetcher, url, abortController, shouldTokenCheck]) 
    
    useEffect(() => {
        setStatus("pending");
        setPromise(fetcher());

        return () => {
            abortController.abort();
        }
    }, [abortController, fetcher]);
    
    if (status === "pending" && promise) {
        throw promise;
    }

    return { data, error };
}