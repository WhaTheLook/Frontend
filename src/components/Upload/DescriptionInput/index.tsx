import { ChangeEvent, memo, useEffect, useRef } from "react";

import { ErrorMessage } from "@/components/common/ErrorMessage";

import * as S from "./style";

interface Props {
  description: string;
  dispatcher: (arg: string) => void;
  error: boolean;
}

export const DescriptionInput = memo(function DescriptionInput({
  description,
  dispatcher,
  error,
}: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChangeDescription = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target;
    dispatcher(value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [description]);

  return (
    <S.Container>
      <S.Textarea
        ref={textAreaRef}
        placeholder="알고싶은 룩을 설명해주세요. "
        name="description"
        id="description"
        rows={3}
        value={description}
        onChange={handleChangeDescription}
      />
      {error && <ErrorMessage message="내용을 입력해주세요." />}
    </S.Container>
  );
});
