import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function KakaoLoginRedirect() {
  const location = useLocation();

  useEffect(() => {
    async function fetcher() {
      const params = new URLSearchParams(location.search);
      const authorizeCode = params.get("code");
      if (!authorizeCode) return;
    }
    fetcher();
  }, [location]);

  return <></>;
}
