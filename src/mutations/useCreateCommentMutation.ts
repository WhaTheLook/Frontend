import { API_PATH } from "@/constants";
import { CommentsType } from "@/types";

import { useAuthMutation } from "@/hooks/mutation/useAuthMutation";

export function useCreateCommentMutation() {
    return useAuthMutation<CommentsType>({
        url: API_PATH.createComment(),
        method: "POST",
        isFormData: false,
        hasReturnType: true,
    });
}