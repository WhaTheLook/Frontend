import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { ACCESS_TOKEN, API_PATH, REFRESH_TOKEN } from "@/constants";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils";
import { CommonError } from "@/utils/CommonError";

import { setSignIn } from "@/store/slice/authSlice";

export function useReIssueToken() {
    const dispatch = useDispatch();

    const reIssueTokenFetcher = useCallback(async function() {
      const refreshToken = getLocalStorageItem(REFRESH_TOKEN);

      try {
          const response = await fetch(API_PATH.tokenReIssue(), {
            method: "POST",
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            body: refreshToken,
          });
  
          if (!response.ok) {
            const { status } = response;
            throw new CommonError(status);
          }
  
          const { accessToken } = await response.json();
  
          setLocalStorageItem(ACCESS_TOKEN, accessToken);
          dispatch(setSignIn())
        } catch (error) {
          // 세션 만료 로그아웃
          if (error instanceof CommonError) {
            const { statusCode } = error;
            switch (statusCode) {
              case 401:
                throw error;
              case 403:
                throw error;
            }
          }
        }
  }, [dispatch]) 

    return { reIssueTokenFetcher };
}