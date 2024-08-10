import { useDispatch } from "react-redux";

import { ACCESS_TOKEN, API_PATH, REFRESH_TOKEN } from "@/constants";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils";
import { CommonError } from "@/utils/CommonError";

import { useLogout } from "@/hooks/useLogout";

import { setSignIn } from "@/store/slice/authSlice";

export function useReIssueToken() {
    const dispatch = useDispatch();

    const { handleLogout } = useLogout();

    const reIssueTokenFetcher = async () =>   {
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
            handleLogout("tokenExpired");
          }
    }

    return { reIssueTokenFetcher };
}