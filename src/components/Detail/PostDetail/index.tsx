import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { ImageWrapper } from "../ImageWrapper";
import { InfoWrapper } from "../InfoWrapper";
import { CommentWrapper } from "../CommentWrapper";
import { DetailMutation } from "../DetailMutation";

import { API_PATH } from "@/constants";
import { PostDetailInfoType } from "@/types";

import { useAuthFetchSuspense } from "@/hooks/useAuthFetchSuspense";

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

  const { data, error } = useAuthFetchSuspense<PostDetailInfoType>({
    url: API_PATH.postDetailInfo({
      postId: selectedPostId,
      userId: isSignIn ? userInfo?.kakaoId : undefined,
    }),
    shouldTokenCheck: false,
  });

  if (error) {
    throw error;
  }

  return (
    data && (
      <Fragment>
        <S.Container $isModal={Boolean(postId)}>
          <ImageWrapper images={data.photoUrls} />
          <S.InfoWrapper>
            <S.PaddingFragment>
              <InfoWrapper data={data} />
              <CommentWrapper />
            </S.PaddingFragment>
          </S.InfoWrapper>
        </S.Container>
        <DetailMutation postId={data.id} />
      </Fragment>
    )
  );
}
