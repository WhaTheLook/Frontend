import { API_PATH } from "@/constants";
import { CommentsType } from "@/types";

import { useAuthMutation } from "@/hooks/mutation/useAuthMutation";

interface Props {
  commentId: number;
  postId: number;
}

export function useAcceptCommentMutation({ commentId, postId }: Props) {
    return useAuthMutation<CommentsType>({
        url: API_PATH.acceptComment({ commentId, postId }),
        method: "POST",
        isFormData: false,
        hasReturnType: true,
    });
}