import { useContext } from "react";

import { ModalContext } from "@/components/common/ModalProvider";

export function useModalContext() {
    return useContext(ModalContext);
}