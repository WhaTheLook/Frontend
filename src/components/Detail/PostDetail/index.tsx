import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ImageWrapper } from "../ImageWrapper";
import { InfoWrapper } from "../InfoWrapper";
import { CommentWrapper } from "../CommentWrapper";

import { API_PATH } from "@/constants";
import { PostDetailInfoType } from "@/types";

import { useFetch } from "@/hooks/useFetch";

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

  const { data, isLoading, error } = useFetch<PostDetailInfoType>({
    url: API_PATH.postDetailInfo({
      postId: selectedPostId,
      userId: isSignIn ? userInfo?.kakaoId : undefined,
    }),
    method: "GET",
  });

  if (error) {
    throw error;
  }

  if (isLoading) {
    return <LoadingSpinner color="#B2B2B2" />;
  }

  return (
    data && (
      <S.Container $isModal={Boolean(postId)}>
        <ImageWrapper images={data.photoUrls} />
        <S.InfoWrapper>
          <S.PaddingFragment>
            <InfoWrapper data={data} />
            <CommentWrapper />
          </S.PaddingFragment>
        </S.InfoWrapper>
      </S.Container>
    )
  );
}
