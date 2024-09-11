import { API_PATH } from "@/constants";

import { useAuthMutation } from "@/hooks/mutation/useAuthMutation";

export function useUpdatePostMutation() {
  return useAuthMutation({
    url: API_PATH.updatePost(),
    method: "PUT",
    isFormData: true,
    hasReturnType: false,
  });
}
