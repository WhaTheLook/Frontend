import { HeartIcon } from "@/components/Icons/HeartIcon";
import { ChatIcon } from "@/components/Icons/ChatIcon";

import { PostListType } from "@/types";
import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

interface Props {
  data: PostListType;
  onItemClick: () => void;
}

export function FlatItem({ data, onItemClick }: Props) {
  const { title, content, tags, writter, date, like, chat, imageUrl } = data;
  return (
    <S.Container onClick={onItemClick}>
      <S.TextWrapper>
        <S.Title>{title}</S.Title>
        <S.Description>{content}</S.Description>
        <S.TagsBox>
          {tags.map((tag) => (
            <S.Tag key={tag}>#{tag}</S.Tag>
          ))}
        </S.TagsBox>
        <S.InfoBox>
          <S.InfoBoxText>
            {writter} | {date}
          </S.InfoBoxText>
        </S.InfoBox>
        <S.SubInfoBox>
          <S.SubInfoDiv>
            <HeartIcon size={ICON_SIZE.TINY} color="rgba(0, 0, 0, 0.5)" />
            <S.SubInfoText>{like}</S.SubInfoText>
          </S.SubInfoDiv>
          <S.SubInfoDiv>
            <ChatIcon size={ICON_SIZE.TINY} color="rgba(0, 0, 0, 0.5)" />
            <S.SubInfoText>{chat}</S.SubInfoText>
          </S.SubInfoDiv>
        </S.SubInfoBox>
      </S.TextWrapper>
      <S.ImageWrapper>
        <S.Image src={imageUrl[0]} />
      </S.ImageWrapper>
    </S.Container>
  );
}
