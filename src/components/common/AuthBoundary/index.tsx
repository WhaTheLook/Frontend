import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { ACCESS_TOKEN, API_PATH, REFRESH_TOKEN } from "@/constants";
import { getLocalStorageItem } from "@/utils";
import { CommonError } from "@/utils/CommonError";
import { ProtectedPathname } from "@/types";

import { useLogout } from "@/hooks/useLogout";
import { useReIssueToken } from "@/hooks/useReIssueToken";

import { selectCurrentSignStatus, setSignIn } from "@/store/slice/authSlice";

interface Props {
  children: ReactNode;
}

interface ResponseType {
  success: string;
  error: string;
}

export function AuthBoundary({ children }: Props) {
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  const isSignIn = useSelector(selectCurrentSignStatus);

  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const path = pathname.split("/")[1] as ProtectedPathname;

  const { handleLogout } = useLogout();
  const { reIssueTokenFetcher } = useReIssueToken();

  const isSamePath = prevPathname === pathname;

  useEffect(() => {
    const accessToken = getLocalStorageItem(ACCESS_TOKEN);
    const refreshToken = getLocalStorageItem(REFRESH_TOKEN);

    if (!accessToken && !refreshToken) {
      handleLogout(path);
      return;
    }

    async function validateTokenFetcher() {
      try {
        const response = await fetch(API_PATH.tokenCheck(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            accessToken,
            refreshToken,
          }),
        });

        if (!response.ok) {
          const { status } = response;
          throw new CommonError(status); // 잘못된 토큰 전달 시 400 에러
        }

        (await response.json()) as ResponseType;

        dispatch(setSignIn());
      } catch (error) {
        if (error instanceof CommonError) {
          switch (error.statusCode) {
            case 401:
              // 토큰 만료시 재발급 요청
              await reIssueTokenFetcher();
              break;
            case 403:
              // 잘못된 토큰 전송 시 로그아웃
              handleLogout(path);
              break;
            default:
              break;
          }
        } else {
          handleLogout(path);
        }
      }
    }

    if (isSamePath) return;

    validateTokenFetcher();
  }, [dispatch, handleLogout, isSamePath, path, reIssueTokenFetcher]);

  useEffect(() => {
    setPrevPathname(pathname);
  }, [pathname, path]);

  return isSignIn ? children : null;
}
