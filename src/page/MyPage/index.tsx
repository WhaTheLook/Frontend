import { Fragment, Suspense } from "react";

import { ProfileContainer } from "@/components/Mypage/ProfileContainer";
import { MyWrittingContainer } from "@/components/Mypage/MyWrittingContainer";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

import { ScrollButton } from "@/components/common/ScrollButton";
import { ProfileFetcher } from "@/fetcher/MyPage/ProfileFetcher";

import * as S from "./style";

export function MyPage() {
  return (
    <Fragment>
      <Suspense fallback={<LoadingSpinner color="#B2B2B2" />}>
        <ProfileFetcher>
          <S.Container>
            <ProfileContainer />
            <MyWrittingContainer />
          </S.Container>
        </ProfileFetcher>
      </Suspense>
      <ScrollButton />
    </Fragment>
  );
}
