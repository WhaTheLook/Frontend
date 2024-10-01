import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { API_PATH, QUERY_KEY } from "@/constants";
import { UserInfoType } from "@/types";
import { setLocalStorageItem } from "@/utils";

import { useAuthFetchQuery } from "@/hooks/query/useAuthFetchQuery";
import { useNonAuthMutation } from "@/hooks/mutation/useNonAuthMutation";

import { setCredential } from "@/store/slice/authSlice";

import * as S from "./style";

export function KakaoLoginRedirect() {
  interface LoginFetchType {
    accessToken: string;
    refreshToken: string;
  }
  const [isMutationSuccess, setIsMutationSuccess] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const authorizeCode = params.get("code");

  const { mutate } = useNonAuthMutation<LoginFetchType>({
    url: API_PATH.login(),
    method: "POST",
    hasReturnType: true,
  });

  useEffect(() => {
    if (!authorizeCode) return;
    mutate(JSON.stringify({ code: authorizeCode }), {
      onSuccess: (data) => {
        const { accessToken, refreshToken } = data!;
        setLocalStorageItem("refreshToken", refreshToken);
        setLocalStorageItem("accessToken", accessToken);
        setIsMutationSuccess(true);
        setError(false);
      },
      onError: () => {
        setError(true);
      },
    });
  }, [authorizeCode, mutate]);

  const { data } = useAuthFetchQuery<UserInfoType>({
    queryKey: QUERY_KEY.loginUserInfo(),
    url: API_PATH.userInfo(),
    shouldTokenCheck: true,
    enabled: isMutationSuccess,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredential({ user: data }));
      navigate("/");
    }
  }, [data, dispatch, navigate]);

  return (
    <S.Container>
      {error && (
        <S.MessageBox>
          <S.Content>
            <S.MessageTitle>로그인 에러</S.MessageTitle>
            <S.Message>로그인 중 에러가 발생했어요.</S.Message>
          </S.Content>
          <S.Button onClick={() => navigate("/")}>홈으로 이동</S.Button>
        </S.MessageBox>
      )}
    </S.Container>
  );
}
