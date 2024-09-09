import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setUserInfo } from "@/store/slice/myPageSlice";

import { useProfileInfoQuery } from "@/quires/useProfileInfoQuery";

interface Props {
  children: ReactNode;
}

export function ProfileFetcher({ children }: Props) {
  const dispatch = useDispatch();

  const { data, isError, error } = useProfileInfoQuery();

  if (isError) {
    throw error;
  }

  useEffect(() => {
    if (!data) return;

    dispatch(setUserInfo({ userInfo: data }));
  }, [data, dispatch]);

  return children;
}
