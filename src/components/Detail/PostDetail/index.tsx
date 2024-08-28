import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { ImageWrapper } from "../ImageWrapper";
import { MainWrapper } from "../MainWrapper";
import { SubMainWrapper } from "../SubMainWrapper";
import { DetailMutation } from "../DetailMutation";

import { API_PATH } from "@/constants";
import { PostDetailInfoType } from "@/types";

import { useDetailContext } from "@/hooks/useDetailContext";
import { useFetchSuspense } from "@/hooks/useFetchSuspense";

import {
  selectCurrentSignStatus,
  selectCurrentUser,
} from "@/store/slice/authSlice";

import * as S from "./style";

export function PostDetail() {
  const { postId } = useParams(); // URL를 통한 렌더링 시
  const {
    state: { modalPostId },
  } = history; // 모달를 통한 렌더링 시
  const selectedPostId = Number(postId || modalPostId);

  const isSignIn = useSelector(selectCurrentSignStatus);
  const userInfo = useSelector(selectCurrentUser);

  const { handleSetData } = useDetailContext();

  const { data, error } = useFetchSuspense<PostDetailInfoType>({
    url: API_PATH.postDetailInfo({
      postId: selectedPostId,
      userId: isSignIn ? userInfo?.kakaoId : undefined,
    }),
  });

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (data) {
      handleSetData(data);
    }
  }, [data, handleSetData]);

  return (
    data && (
      <Fragment>
        <S.Container $isModal={Boolean(postId)}>
          <ImageWrapper />
          <S.InfoWrapper>
            <MainWrapper />
            <SubMainWrapper />
          </S.InfoWrapper>
        </S.Container>
        <DetailMutation />
      </Fragment>
    )
  );
}
