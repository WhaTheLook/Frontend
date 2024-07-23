import { Fragment } from "react";

import { FileIcon } from "@/components/Icons/FileIcon";
import { ChatIcon } from "@/components/Icons/ChatIcon";
import { BookMarkIcon } from "@/components/Icons/BookmarkIcon";

import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

interface Props {
  contentType: "post" | "comment" | "bookmark";
}

const ICONS_AND_TEXTS = {
  post: {
    Icon: FileIcon,
    text: "아직 작성한 게시글이 없어요.",
  },
  comment: {
    Icon: ChatIcon,
    text: "아직 작성한 댓글이 없어요.",
  },
  bookmark: {
    Icon: BookMarkIcon,
    text: "아직 저장한 게시물이 없어요.",
  },
};

const Content = ({ contentType }: Props) => {
  const { Icon, text } = ICONS_AND_TEXTS[contentType];
  return (
    <Fragment>
      <Icon size={ICON_SIZE.LARGE} color="#b2b2b2" />
      <S.Text>{text}</S.Text>
    </Fragment>
  );
};

export function NothingInfo({ contentType }: Props) {
  return (
    <S.Container>
      <S.Box>
        <Content contentType={contentType} />
      </S.Box>
    </S.Container>
  );
}
