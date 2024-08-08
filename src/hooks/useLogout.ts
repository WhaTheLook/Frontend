import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";
import { removeLocalStorageItem } from "@/utils";
import { ProtectedPathname } from "@/types";

import { logout } from "@/store/slice/authSlice";

export function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (currentPath: ProtectedPathname) => {
        dispatch(logout());
        removeLocalStorageItem(ACCESS_TOKEN);
        removeLocalStorageItem(REFRESH_TOKEN);
        navigate("/login", { state: currentPath });
    };

    return { handleLogout };
}