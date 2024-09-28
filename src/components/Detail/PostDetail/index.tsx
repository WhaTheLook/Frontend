import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ImageWrapper } from "../ImageWrapper";
import { DetailMain } from "../DetailMain";
import { DetailMutation } from "../DetailMutation";

import { API_PATH, QUERY_KEY } from "@/constants";
import { PostDetailInfoType } from "@/types";

import { useDetailContext } from "@/hooks/contexts/useDetailContext";

import { useAuthSuspenseFetchQuery } from "@/hooks/query/useAuthSuspenseFetchQuery";

import * as S from "./style";

export function PostDetail() {
  const { postId } = useParams(); // URL를 통한 렌더링 시
  const {
    state: { modalPostId },
  } = history; // 모달를 통한 렌더링 시
  const selectedPostId = Number(postId || modalPostId);

  const { setPostDetail, data } = useDetailContext();

  const { data: fetchedData, error } =
    useAuthSuspenseFetchQuery<PostDetailInfoType>({
      queryKey: QUERY_KEY.detail(selectedPostId),
      url: API_PATH.postDetailInfo({
        postId: selectedPostId,
      }),
      shouldTokenCheck: false,
    });

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (!fetchedData) return;

    setPostDetail(fetchedData);
  }, [fetchedData, setPostDetail]);

  return (
    data.id !== 0 && (
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
