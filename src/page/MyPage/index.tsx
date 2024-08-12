import { Suspense } from "react";
import { Provider } from "react-redux";

import { ProfileContainer } from "@/components/Mypage/ProfileContainer";
import { MyWritting } from "@/components/Mypage/MyWritting";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

import { ProfileFetcher } from "@/fetcher/MyPage/ProfileFetcher";

import { myPageStore } from "@/store";

import * as S from "./style";

export function MyPage() {
  return (
    <Provider store={myPageStore}>
      <Suspense fallback={<LoadingSpinner color="#B2B2B2" />}>
        <S.Container>
          <ProfileFetcher>
            <ProfileContainer />
          </ProfileFetcher>
          <MyWritting />
        </S.Container>
      </Suspense>
    </Provider>
  );
}
