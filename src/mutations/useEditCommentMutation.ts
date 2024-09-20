import { API_PATH } from "@/constants";

import { useAuthMutation } from "@/hooks/mutation/useAuthMutation";

interface Props {
  commentId: number;
}

export function useEditCommentMutation({ commentId }: Props) {
    return useAuthMutation({
        url: API_PATH.updateComment({ commentId }),
        method: "PUT",
        isFormData: false,
        hasReturnType: false,
    });
}