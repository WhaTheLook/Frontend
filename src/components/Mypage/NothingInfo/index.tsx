import { Fragment } from "react";

import { FileIcon } from "@/components/Icons/FileIcon";
import { ChatIcon } from "@/components/Icons/ChatIcon";

import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

interface Props {
  menu: "post" | "comment";
}

const Content = ({ menu }: Props) => {
  if (menu === "post")
    return (
      <Fragment>
        <FileIcon size={ICON_SIZE.LARGE} color="#b2b2b2" />
        <S.Text>아직 작성한 게시글이 없어요.</S.Text>
      </Fragment>
    );
  if (menu === "comment")
    return (
      <Fragment>
        <ChatIcon size={ICON_SIZE.LARGE} color="#b2b2b2" />
        <S.Text>아직 작성한 댓글이 없어요.</S.Text>
      </Fragment>
    );

  return null;
};

export function NothingInfo({ menu }: Props) {
  return (
    <S.Container>
      <S.Box>
        <Content menu={menu} />
      </S.Box>
    </S.Container>
  );
}
