import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentSignStatus } from "@/store/slice/authSlice";

interface Props {
  children: ReactNode;
}

export function AuthBoundary({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const isSignIn = useSelector(selectCurrentSignStatus);

  const { pathname } = location;
  const path = pathname.split("/")[1];

  useEffect(() => {
    if (!isSignIn) {
      navigate("/login", { state: path });
      return;
    }
  }, [isSignIn, navigate, path]);

  return isSignIn ? children : null;
}
