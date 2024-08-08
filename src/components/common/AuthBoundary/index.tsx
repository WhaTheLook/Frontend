import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ACCESS_TOKEN, API_PATH, REFRESH_TOKEN } from "@/constants";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils";
import { CommonError } from "@/utils/CommonError";

import { useLogout } from "@/hooks/useLogout";
import { ProtectedPathname } from "@/types";

interface Props {
  children: ReactNode;
}

interface ResponseType {
  success: string;
  error: string;
}

export function AuthBoundary({ children }: Props) {
  const [isSignIn, setIsSignIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const path = pathname.split("/")[1] as ProtectedPathname;

  const { handleLogout } = useLogout();

  useEffect(() => {
    const accessToken = getLocalStorageItem(ACCESS_TOKEN);
    const refreshToken = getLocalStorageItem(REFRESH_TOKEN);

    if (!accessToken && !refreshToken) {
      handleLogout(path);
      return;
    }

    async function renewAccessToken() {
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
        setIsSignIn(true);
      } catch (error) {
        // 세션 만료 로그아웃
        handleLogout("tokenExpired");
      }
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

        setIsSignIn(true);
      } catch (error) {
        if (error instanceof CommonError) {
          switch (error.statusCode) {
            case 401:
              await renewAccessToken();
              break;
            case 403:
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

    validateTokenFetcher();
  }, [handleLogout, navigate, path]);

  return isSignIn ? children : null;
}
