import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { TOAST_MESSAGE, toastType } from "@/constants";
import { CommentsType, UserInfoType } from "@/types";

import { useToastContext } from "@/hooks/contexts/useToastContex";
import { useDetailContext } from "@/hooks/contexts/useDetailContext";

import { selectCurrentUser } from "@/store/slice/authSlice";

import { useEditCommentMutation } from "@/mutations/useEditCommentMutation";
import { useReplyCommentMutation } from "@/mutations/useReplyCommentMutation";

import * as S from "./style";

interface Props {
  type: "EDIT" | "REPLY";
  data: CommentsType;
  handleClose: () => void;
}

export function CommentSubForm({ type, data, handleClose }: Props) {
  const { postId } = useParams(); // URL를 통한 렌더링 시
  const {
    state: { modalPostId },
  } = history; // 모달를 통한 렌더링 시
  const selectedPostId = Number(postId || modalPostId);

  const [inputText, setInputText] = useState(type === "EDIT" ? data.text : "");
  const parentUserName = `@${data.author.name} `;

  const { handleToastOpen } = useToastContext();
  const { updateComment, addReplyComment } = useDetailContext();

  const loginUserInfo = useSelector(selectCurrentUser) as UserInfoType;

  const editPayload = { commentId: data.id, text: inputText };
  const replyPayload = {
    postId: selectedPostId,
    userId: Number(loginUserInfo.kakaoId),
    parentId: data.id,
    text: inputText.replace(parentUserName, "").trim(),
    targetId: data.author.kakaoId,
  };

  const { mutate: editMutate, isPending: editIsPending } =
    useEditCommentMutation({ commentId: data.id });

  const { mutate: replyMutate, isPending: replyIsPending } =
    useReplyCommentMutation();

  const isDisabled = () => {
    return (
      editIsPending ||
      replyIsPending ||
      inputText === data.text ||
      inputText === ""
    );
  };

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target;
    switch (type) {
      case "EDIT":
        setInputText(value);
        break;
      case "REPLY":
        if (!value.startsWith(parentUserName)) {
          setInputText(parentUserName);
        } else {
          setInputText(value);
        }
        break;
    }
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    switch (type) {
      case "EDIT":
        editMutate(JSON.stringify(editPayload), {
          onSuccess: () => {
            handleClose();
            handleToastOpen({
              type: toastType.SUCCESS,
              content: TOAST_MESSAGE.successUpdateComment(),
            });
            updateComment({ commentId: data.id, newText: inputText });
          },
          onError: () => {
            handleToastOpen({
              type: toastType.ERROR,
              content: TOAST_MESSAGE.failUpdateComment(),
            });
          },
        });
        break;
      case "REPLY":
        replyMutate(JSON.stringify(replyPayload), {
          onSuccess: (newComment) => {
            handleClose();
            addReplyComment({ newComment: newComment!, parentId: data.id });
          },
          onError: () => {
            handleToastOpen({
              type: toastType.ERROR,
              content: TOAST_MESSAGE.failCreateComment(),
            });
          },
        });
        break;
    }
  };

  useEffect(() => {
    if (type === "REPLY") {
      setInputText(parentUserName);
    }
  }, [type, parentUserName]);

  return (
    <S.EditForm $isEdit={type === "EDIT"}>
      <S.EditTextArea value={inputText} onChange={handleChange} />
      <S.EditButtonBox>
        <S.EditCancleBtn
          onClick={handleClose}
          disabled={editIsPending || replyIsPending}
        >
          취소
        </S.EditCancleBtn>
        <S.EditConfirmBtn onClick={handleSubmit} disabled={isDisabled()}>
          {type === "EDIT" ? "수정" : "답글"}
        </S.EditConfirmBtn>
      </S.EditButtonBox>
    </S.EditForm>
  );
}
