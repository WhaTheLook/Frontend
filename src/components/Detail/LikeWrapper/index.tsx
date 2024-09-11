import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { HeartIcon } from "@/components/Icons/HeartIcon";
import { ToastContainer } from "@/components/common/ToastContainer";

import { getLocalStorageItem } from "@/utils";
import { ACCESS_TOKEN, API_PATH, TOAST_MESSAGE, toastType } from "@/constants";
import { ICON_SIZE } from "@/constants/style";

import { useToastContext } from "@/hooks/contexts/useToastContex";
import { useAuthMutation } from "@/hooks/useAuthMutation";
import { useDetailContext } from "@/hooks/contexts/useDetailContext";

import { selectCurrentUser } from "@/store/slice/authSlice";

import * as S from "./style";

export function LikeWrapper() {
  const [count, setCount] = useState(0);
  const [isLike, setIsLike] = useState(false);

  const user = useSelector(selectCurrentUser);
  const { data } = useDetailContext();
  const { likeCount, likeYN, id } = data;

  const { handleToastOpen } = useToastContext();

  const { fetcher } = useAuthMutation({
    url: API_PATH.likePost(),
    method: "POST",
    body: JSON.stringify({
      userId: user?.kakaoId,
      postId: id,
    }),
    hasReturnType: false,
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
    } catch {
      rollBackUI(isLike, TOAST_MESSAGE.likeError());
    }
  };

  useEffect(() => {
    setCount(likeCount);
    setIsLike(likeYN);
  }, [likeCount, likeYN]);

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
