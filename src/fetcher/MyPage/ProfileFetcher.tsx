import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

import { API_PATH } from "@/constants";
import { UserInfoFetchType } from "@/types";

import { useAuthFetchSuspense } from "@/hooks/useAuthFetchSuspense";

import { setUserInfo } from "@/store/slice/myPageSlice";

interface Props {
  children: ReactNode;
}

export function ProfileFetcher({ children }: Props) {
  const dispatch = useDispatch();

  const { data, error } = useAuthFetchSuspense<UserInfoFetchType>({
    url: API_PATH.userInfo(),
    shouldTokenCheck: true,
  });

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (!data) return;

    const { name, profileImage, kakaoId, postCount, commentCount } = data;
    dispatch(
      setUserInfo({
        userInfo: {
          name,
          profileImage,
          kakaoId,
          commentCount,
          postCount,
        },
      })
    );
  }, [data, dispatch]);

  if (!data) return null;

  return children;
}
