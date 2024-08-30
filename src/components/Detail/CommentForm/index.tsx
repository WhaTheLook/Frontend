import { ChangeEvent, MouseEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { SendIcon } from "@/components/Icons/SendIcon";
import { ToastContainer } from "@/components/common/ToastContainer";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

import { API_PATH, TOAST_MESSAGE, toastType } from "@/constants";
import { ICON_SIZE } from "@/constants/style";
import { CommentsType, UserInfoType } from "@/types";

import { useAuthMutation } from "@/hooks/useAuthMutation";
import { useToastContext } from "@/hooks/useToastContex";
import { useDetailContext } from "@/hooks/useDetailContext";

import { selectCurrentUser } from "@/store/slice/authSlice";

import * as S from "./style";

interface Props {
  text: string;
  onChangeText: (text: string) => void;
}

export function CommentForm({ text, onChangeText }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { postId } = useParams(); // URL를 통한 렌더링 시
  const {
    state: { modalPostId },
  } = history; // 모달를 통한 렌더링 시
  const selectedPostId = Number(postId || modalPostId);

  const loginUserInfo = useSelector(selectCurrentUser) as UserInfoType;

  const { handleToastOpen } = useToastContext();
  const { addComment } = useDetailContext();

  const scrollView = document.getElementById("detail-scrollView");
  const infoWrapper = document.getElementById("info-wrapper");

  const commentPayload = {
    postId: selectedPostId,
    userId: Number(loginUserInfo.kakaoId),
    text: text.trim(),
  };

  const { fetcher } = useAuthMutation<CommentsType>({
    url: API_PATH.createComment(),
    method: "POST",
    body: JSON.stringify(commentPayload),
    hasReturnType: true,
  });

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const newComment = await fetcher();

      scrollView?.scrollTo({
        top: infoWrapper?.offsetHeight,
        behavior: "instant",
      });
      addComment(newComment!);
      onChangeText("");
    } catch (error) {
      handleToastOpen({
        type: toastType.ERROR,
        content: TOAST_MESSAGE.failCreateComment(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target;
    onChangeText(value);
  };

  const isDisable = () => {
    return text === "" || isLoading;
  };

  return (
    <S.Container>
      <S.Form>
        {isLoading ? (
          <LoadingSpinner color="#A2A2A2" isNoPadding={true} />
        ) : (
          <S.TextInput
            onChange={handleChange}
            placeholder="댓글 달기..."
            value={text}
          />
        )}
        <S.SubmitButton onClick={handleSubmit} disabled={isDisable()}>
          <SendIcon size={ICON_SIZE.SMALL} color="#FFFFFF" />
        </S.SubmitButton>
      </S.Form>
      <ToastContainer />
    </S.Container>
  );
}
