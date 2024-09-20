import { ChangeEvent, MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { SendIcon } from "@/components/Icons/SendIcon";
import { ToastContainer } from "@/components/common/ToastContainer";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

import { TOAST_MESSAGE, toastType } from "@/constants";
import { ICON_SIZE } from "@/constants/style";
import { UserInfoType } from "@/types";

import { useToastContext } from "@/hooks/contexts/useToastContex";
import { useDetailContext } from "@/hooks/contexts/useDetailContext";

import { selectCurrentUser } from "@/store/slice/authSlice";

import { useCreateCommentMutation } from "@/mutations/useCreateCommentMutation";

import * as S from "./style";

interface Props {
  text: string;
  onChangeText: (text: string) => void;
}

export function CommentForm({ text, onChangeText }: Props) {
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
    parentId: undefined,
    text: text.trim(),
  };

  const { isPending, mutate } = useCreateCommentMutation();

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    mutate(JSON.stringify(commentPayload), {
      onSuccess: (newComment) => {
        scrollView?.scrollTo({
          top: infoWrapper?.offsetHeight,
          behavior: "instant",
        });
        addComment(newComment!);
        onChangeText("");
      },
      onError: () => {
        handleToastOpen({
          type: toastType.ERROR,
          content: TOAST_MESSAGE.failCreateComment(),
        });
      },
    });
  };

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target;
    onChangeText(value);
  };

  const isDisable = () => {
    return text === "" || isPending;
  };

  return (
    <S.Container>
      <S.Form>
        {isPending ? (
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
