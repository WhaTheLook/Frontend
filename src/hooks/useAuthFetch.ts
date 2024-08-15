import { useState } from "react";

import { CommonError } from "@/utils/CommonError";
import { getLocalStorageItem } from "@/utils";
import { ACCESS_TOKEN } from "@/constants";

interface Props {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    body: XMLHttpRequestBodyInit;
}

export function useAuthFetch({ url, method, body }: Props) {
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function fetcher() {
        try {
            const accessToken = getLocalStorageItem(ACCESS_TOKEN);

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body
            });
    
            if (!response.ok) {
                const { status } = response;
                throw new CommonError(status);
            }

            await response.json();

            setIsLoading(false);
            setSuccess(true);
        } catch(error) {
            if (error instanceof CommonError) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }    
    }

    return { fetcher, success, isLoading }
}