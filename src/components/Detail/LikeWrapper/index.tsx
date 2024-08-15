import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

import { HeartIcon } from "@/components/Icons/HeartIcon";
import { ToastContainer } from "@/components/common/ToastContainer";

import { getLocalStorageItem } from "@/utils";
import { CommonError } from "@/utils/CommonError";
import { ACCESS_TOKEN, API_PATH, TOAST_MESSAGE, toastType } from "@/constants";
import { ICON_SIZE } from "@/constants/style";

import { useReIssueToken } from "@/hooks/useReIssueToken";
import { useToastContext } from "@/hooks/useToastContex";
import { useAuthFetch } from "@/hooks/useAuthFetch";

import { selectCurrentUser } from "@/store/slice/authSlice";

import * as S from "./style";

interface Props {
  likeCount: number;
  likeYN: boolean;
  postId: number;
}

export function LikeWrapper({ likeCount, likeYN, postId }: Props) {
  const [count, setCount] = useState(likeCount);
  const [isLike, setIsLike] = useState(likeYN);

  const user = useSelector(selectCurrentUser);

  const { reIssueTokenFetcher } = useReIssueToken();
  const { handleToastOpen } = useToastContext();

  const { fetcher } = useAuthFetch({
    url: API_PATH.likePost(),
    method: "POST",
    body: JSON.stringify({
      userId: user?.kakaoId,
      postId,
    }),
  });

  const rollBackUI = (currentLikeStatus: boolean, content: string) => {
    if (currentLikeStatus) {
      setCount((prev) => prev + 1);
      setIsLike(true);
    } else {
      setCount((prev) => prev - 1);
      setIsLike(false);
    }
    handleToastOpen({ type: toastType.ERROR, content });
  };

  const changeUI = (currentLikeStatus: boolean) => {
    if (currentLikeStatus) {
      // 현재 좋아요 상태 시 버튼 클릭
      setCount((prev) => prev - 1);
      setIsLike(false);
    } else {
      // 현재 비좋아요 상태 시 버튼 클릭
      setCount((prev) => prev + 1);
      setIsLike(true);
    }
  };

  const handleLikeClick = async () => {
    try {
      const accessToken = getLocalStorageItem(ACCESS_TOKEN);
      if (!accessToken) {
        alert("로그인 후 이용하세요.");
        return;
      }

      changeUI(isLike);
      await fetcher();
    } catch (error) {
      if (error instanceof CommonError) {
        const { statusCode } = error;
        switch (statusCode) {
          case 401:
            try {
              await reIssueTokenFetcher();
              await fetcher();
            } catch (error) {
              rollBackUI(isLike, TOAST_MESSAGE.tokenExpired());
            }
            break;
          default:
            rollBackUI(isLike, TOAST_MESSAGE.likeError());
            break;
        }
      } else {
        rollBackUI(isLike, TOAST_MESSAGE.likeError());
      }
    }
  };

  return (
    <Fragment>
      <S.Box onClick={handleLikeClick}>
        <HeartIcon
          size={ICON_SIZE.MEDIUM_SMALL}
          color={isLike ? "#FF5858" : "#000000"}
          isLike={isLike}
        />
      </S.Box>
      <S.Text>{count}</S.Text>
      <ToastContainer />
    </Fragment>
  );
}
