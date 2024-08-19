import { useContext } from "react";

import { ToastContext } from "@/components/common/ToastProvider"

export function useToastContext() {
    return useContext(ToastContext);
}