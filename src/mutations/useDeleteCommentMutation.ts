import { API_PATH } from "@/constants";
import { CommentsType } from "@/types";

import { useAuthMutation } from "@/hooks/mutation/useAuthMutation";

interface Props {
  commentId: number;
}

export function useDeleteCommentMutation({ commentId }: Props) {
    return useAuthMutation<CommentsType>({
        url: API_PATH.deleteComment({ commentId }),
        method: "DELETE",
        isFormData: false,
        hasReturnType: false,
    });
}