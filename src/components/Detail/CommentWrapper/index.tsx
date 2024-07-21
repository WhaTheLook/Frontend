import { Fragment } from "react";

import { SendIcon } from "@/components/Icons/SendIcon";

import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

export function CommentWrapper() {
  return (
    <Fragment>
      <S.CommentBox>
        <S.Form>
          <S.TextInput placeholder="정보 제공하기..."></S.TextInput>
          <S.SubmitButton>
            <SendIcon size={ICON_SIZE.SMALL} color="#FFFFFF" />
          </S.SubmitButton>
        </S.Form>
      </S.CommentBox>
    </Fragment>
  );
}
