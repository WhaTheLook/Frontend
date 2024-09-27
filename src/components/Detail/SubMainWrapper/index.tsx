import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { CommentForm } from "@/components/Detail/CommentForm";
import { SubInfoBox } from "@/components/Detail/SubInfoBox";

import { useResizeWindow } from "@/hooks/useResizeWindow";

import { selectCurrentSignStatus } from "@/store/slice/authSlice";

import * as S from "./style";

export function SubMainWrapper() {
  const { postId } = useParams();
  const [inputText, setInputText] = useState("");

  const { breakPoint } = useResizeWindow();

  const isSignIn = useSelector(selectCurrentSignStatus);

  const isShow = () => !!postId || breakPoint !== "mobile";

  const handleChangeText = (text: string) => {
    setInputText(text);
  };
  return (
    <S.Container>
      <SubInfoBox />
      {isShow() && (
        <Fragment>
          {isSignIn ? (
            <CommentForm text={inputText} onChangeText={handleChangeText} />
          ) : (
            <S.LoginGuideText>
              로그인 후 댓글을 작성할 수 있어요.
            </S.LoginGuideText>
          )}
        </Fragment>
      )}
    </S.Container>
  );
}
