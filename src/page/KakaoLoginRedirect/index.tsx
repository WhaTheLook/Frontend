import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { API_PATH } from "@/constants";
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

      const response = await fetch(API_PATH.login(authorizeCode), {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("로그인 에러");
      }

      const { refreshToken, accessToken } = await response.json();

      const response2 = await fetch(API_PATH.userInfo(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response2.ok) {
        throw new Error("회원정보 불러올수 없음.");
      }

      const { data } = await response2.json();
      const { name, kakaoId, profileImage } = data;

      dispatch(
        setCredential({
          accessToken,
          user: {
            name,
            kakaoId,
            profileImage,
          },
        })
      );

      setLocalStorageItem("refreshToken", refreshToken);
      setLocalStorageItem("accessToken", accessToken);

      navigate("/");
    }

    fetcher();
  }, [location, navigate, dispatch]);

  return <></>;
}
