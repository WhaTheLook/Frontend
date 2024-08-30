import { useState } from "react";
import { useSelector } from "react-redux";

import { CommentForm } from "@/components/Detail/CommentForm";
import { SubInfoBox } from "@/components/Detail/SubInfoBox";

import { selectCurrentSignStatus } from "@/store/slice/authSlice";

import * as S from "./style";

export function SubMainWrapper() {
  const [inputText, setInputText] = useState("");

  const isSignIn = useSelector(selectCurrentSignStatus);

  const handleChangeText = (text: string) => {
    setInputText(text);
  };
  return (
    <S.Container>
      <SubInfoBox />
      {isSignIn ? (
        <CommentForm text={inputText} onChangeText={handleChangeText} />
      ) : (
        <S.LoginGuideText>로그인 후 댓글을 작성할 수 있어요.</S.LoginGuideText>
      )}
    </S.Container>
  );
}
