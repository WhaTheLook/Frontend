import { API_PATH, QUERY_KEY } from "@/constants";
import { UserInfoFetchType } from "@/types";

import { useAuthSuspenseFetchQuery } from "@/hooks/query/useAuthSuspenseFetchQuery";

export function useProfileInfoQuery() {
  return useAuthSuspenseFetchQuery<UserInfoFetchType>({
    queryKey: QUERY_KEY.profile(),
    url: API_PATH.userInfo(),
    shouldTokenCheck: true
  });
}
