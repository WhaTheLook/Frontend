import { API_PATH } from "@/constants";

import { useAuthMutation } from "@/hooks/mutation/useAuthMutation";

export function useCreatePostMutation() {
  return useAuthMutation({
    url: API_PATH.createPost(),
    method: "POST",
    isFormData: true,
    hasReturnType: false,
  });
}
