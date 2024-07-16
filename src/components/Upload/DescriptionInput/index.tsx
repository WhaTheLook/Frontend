import { ChangeEvent, memo, useEffect, useRef } from "react";

import * as S from "./style";

interface Props {
  description: string;
  dispatcher: (arg: string) => void;
}

export const DescriptionInput = memo(function DescriptionInput({
  description,
  dispatcher,
}: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChangeDescription = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target;
    dispatcher(value.trim());
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
    </S.Container>
  );
});
