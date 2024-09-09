import { API_PATH } from "@/constants";
import { UserInfoFetchType } from "@/types";

import { useAuthSuspenseFetchQuery } from "@/hooks/query/useAuthSuspenseFetchQuery";

const QUERY_KEY = ["profile"];

export function useProfileInfoQuery() {
  return useAuthSuspenseFetchQuery<UserInfoFetchType>({
    queryKey: QUERY_KEY,
    url: API_PATH.userInfo(),
    shouldTokenCheck: true
  });
}
