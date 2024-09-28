import { useContext } from "react";

import { PostContext } from "@/components/common/PostProvider";

export function usePostsContext() {
    return useContext(PostContext);
}