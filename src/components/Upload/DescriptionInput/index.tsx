import { ChangeEvent, useEffect, useRef, useState } from "react";

import * as S from "./style";

export function DescriptionInput() {
  const [inputText, setInputText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target;
    setInputText(value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  return (
    <S.Container>
      <S.Textarea
        ref={textAreaRef}
        placeholder="알고싶은 룩을 설명해주세요. "
        name="description"
        id="description"
        rows={3}
        onChange={handleChange}
      />
    </S.Container>
  );
}
