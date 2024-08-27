import { useState } from "react";

import { CommentForm } from "@/components/Detail/CommentForm";
import { SubInfoBox } from "@/components/Detail/SubInfoBox";

import * as S from "./style";

export function SubMainWrapper() {
  const [inputText, setInputText] = useState("");

  const handleChangeText = (text: string) => {
    setInputText(text);
  };

  return (
    <S.Container>
      <SubInfoBox />
      <CommentForm text={inputText} onChangeText={handleChangeText} />
    </S.Container>
  );
}
