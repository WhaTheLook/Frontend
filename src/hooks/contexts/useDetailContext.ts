import { useContext } from "react";

import { DetailContext } from "@/components/Detail/DetailProvider";

export function useDetailContext() {
    return useContext(DetailContext)
}