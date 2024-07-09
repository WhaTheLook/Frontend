import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function KakaoLoginRedirect() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authorizeCode = params.get("code");

    if (authorizeCode) {
      // 여기에 authorization code를 사용하여 추가 작업 수행
    }
  }, [location]);

  return <></>;
}
