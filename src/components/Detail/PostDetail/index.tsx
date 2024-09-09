import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ImageWrapper } from "../ImageWrapper";
import { DetailMain } from "../DetailMain";
import { DetailMutation } from "../DetailMutation";

import { API_PATH } from "@/constants";
import { PostDetailInfoType } from "@/types";

import { useAuthFetchSuspense } from "@/hooks/useAuthFetchSuspense";
import { useDetailContext } from "@/hooks/useDetailContext";

import * as S from "./style";

export function PostDetail() {
  const { postId } = useParams(); // URL를 통한 렌더링 시
  const {
    state: { modalPostId },
  } = history; // 모달를 통한 렌더링 시
  const selectedPostId = Number(postId || modalPostId);

  const { setPostDetail } = useDetailContext();

  const { data, error } = useAuthFetchSuspense<PostDetailInfoType>({
    url: API_PATH.postDetailInfo({
      postId: selectedPostId,
    }),
    shouldTokenCheck: false,
  });

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (data) {
      setPostDetail(data);
    }
  }, [data, setPostDetail]);

  return (
    data && (
      <Fragment>
        <S.Container $isModal={Boolean(postId)}>
          <ImageWrapper />
          <DetailMain />
        </S.Container>
        <DetailMutation />
      </Fragment>
    )
  );
}
