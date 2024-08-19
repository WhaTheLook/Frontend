import { useContext } from "react";

import { DetailModalContext } from "@/components/Detail/DetailModalProvider";

export function useDetailModalContext() {
  return useContext(DetailModalContext);
}
