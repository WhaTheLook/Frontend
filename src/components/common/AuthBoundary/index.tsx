import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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

  const accessToken = getLocalStorageItem(ACCESS_TOKEN);
  const refreshToken = getLocalStorageItem(REFRESH_TOKEN);

  const isSamePath = prevPathname === pathname;
  const hasToken = !!accessToken && !!refreshToken;

  const tokenCheckFetcher = async () => {
    try {
      const response = await fetch(API_PATH.tokenCheck(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ accessToken, refreshToken }),
      });

      if (!response.ok) {
        const { status } = response;
        throw new CommonError(status);
      }

      const result = (await response.json()) as ResponseType;
      return result;
    } catch (error) {
      if (error instanceof CommonError && error.statusCode === 401) {
        return await reIssueTokenFetcher();
      }
      throw error;
    }
  };

  const { isSuccess, isError, isFetching } = useQuery({
    queryKey: ["auth", accessToken, refreshToken],
    queryFn: tokenCheckFetcher,
    staleTime: 1000 * 60 * 10, // 10분간 최신 데이터로 유지
    gcTime: 0, // 토큰이 변경되면 데이터 메모리에서 삭제
    enabled: !isSamePath && hasToken, // 동일한 경로일 때는 실행 안함, 토큰 있을 때만 실행.
    retry: false,
  });

  if (isSuccess) {
    dispatch(setSignIn());
  }

  useEffect(() => {
    if (isError) {
      handleLogout(path);
    }
  }, [isError, handleLogout, path]);

  useEffect(() => {
    setPrevPathname(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!hasToken) {
      handleLogout(path);
    }
  }, [hasToken, handleLogout, path]);

  if (isError) return null;

  return isSignIn && !isFetching ? children : null;
}
