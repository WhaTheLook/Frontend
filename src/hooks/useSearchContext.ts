import { useContext } from "react";

import { SearchContext } from "@/components/Search/SearchProvider";

export function useSearchContext() {
    return useContext(SearchContext);
}