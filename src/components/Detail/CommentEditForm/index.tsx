import { ChangeEvent, MouseEvent, useState } from "react";

import { API_PATH, TOAST_MESSAGE, toastType } from "@/constants";
import { CommentsType } from "@/types";

import { useToastContext } from "@/hooks/useToastContex";
import { useDetailContext } from "@/hooks/useDetailContext";
import { useAuthMutation } from "@/hooks/useAuthMutation";

import * as S from "./style";

interface Props {
  data: CommentsType;
  handleCloseEdit: () => void;
}

export function CommentEditForm({ data, handleCloseEdit }: Props) {
  const [inputText, setInputText] = useState(data.text);
  const [isLoading, setIsLoading] = useState(false);

  const { handleToastOpen } = useToastContext();
  const { updateComment } = useDetailContext();

  const fetcherPayload = {
    commentId: data.id,
    text: inputText,
  };

  const { fetcher } = useAuthMutation({
    url: API_PATH.updateComment({ commentId: data.id }),
    method: "PUT",
    body: JSON.stringify(fetcherPayload),
    hasReturnType: false,
  });

  const isDisabled = () => {
    return isLoading || inputText === data.text;
  };

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target;
    setInputText(value);
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await fetcher();

      handleCloseEdit();
      handleToastOpen({
        type: toastType.SUCCESS,
        content: TOAST_MESSAGE.successUpdateComment(),
      });
      updateComment({ commentId: data.id, newText: inputText });
    } catch (error) {
      handleToastOpen({
        type: toastType.ERROR,
        content: TOAST_MESSAGE.failUpdateComment(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.EditForm>
      <S.EditTextArea value={inputText} onChange={handleChange} />
      <S.EditButtonBox>
        <S.EditCancleBtn onClick={handleCloseEdit} disabled={isLoading}>
          취소
        </S.EditCancleBtn>
        <S.EditConfirmBtn onClick={handleSubmit} disabled={isDisabled()}>
          수정
        </S.EditConfirmBtn>
      </S.EditButtonBox>
    </S.EditForm>
  );
}
