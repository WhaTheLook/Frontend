import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { API_PATH } from "@/constants";
import { UserInfoType } from "@/types";
import { setLocalStorageItem } from "@/utils";

import { setCredential } from "@/store/slice/authSlice";

export function KakaoLoginRedirect() {
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetcher() {
      const params = new URLSearchParams(location.search);
      const authorizeCode = params.get("code");
      if (!authorizeCode) return;

      const loginResponse = await fetch(API_PATH.login(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: authorizeCode }),
      });

      if (!loginResponse.ok) {
        throw new Error("로그인 에러");
      }

      const { accessToken, refreshToken } = await loginResponse.json();

      const userInfoResponse = await fetch(API_PATH.userInfo(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!userInfoResponse.ok) {
        throw new Error("회원정보 불러올수 없음.");
      }

      const { kakaoId, name, profileImage } = await userInfoResponse.json();

      const signInUserInfo: UserInfoType = {
        name,
        kakaoId,
        profileImage,
      };

      dispatch(setCredential({ user: signInUserInfo }));

      setLocalStorageItem("refreshToken", refreshToken);
      setLocalStorageItem("accessToken", accessToken);

      navigate("/");
    }

    fetcher();
  }, [location, navigate, dispatch]);

  return <></>;
}
