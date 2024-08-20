import { Suspense } from "react";
import { Provider } from "react-redux";

import { ProfileContainer } from "@/components/Mypage/ProfileContainer";
import { MyWrittingContainer } from "@/components/Mypage/MyWrittingContainer";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ScrollButton } from "@/components/common/ScrollButton";

import { ProfileFetcher } from "@/fetcher/MyPage/ProfileFetcher";

import { myPageStore } from "@/store";

import * as S from "./style";

export function MyPage() {
  return (
    <Provider store={myPageStore}>
      <Suspense fallback={<LoadingSpinner color="#B2B2B2" />}>
        <ProfileFetcher>
          <S.Container>
            <ProfileContainer />
            <MyWrittingContainer />
          </S.Container>
        </ProfileFetcher>
      </Suspense>
      <ScrollButton />
    </Provider>
  );
}
