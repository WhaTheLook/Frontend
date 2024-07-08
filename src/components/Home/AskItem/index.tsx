import { HeartIcon } from "@/components/Icons/HeartIcon";
import { ChatIcon } from "@/components/Icons/ChatIcon";

import * as S from "./style";

interface Props {
  content: {
    title: string;
    description: string;
    tags: string[];
    writter: string;
    date: string;
    like: number;
    chat: number;
    imageUrl: string;
  };
}

export function AskItem({ content }: Props) {
  const { title, description, tags, writter, date, like, chat, imageUrl } =
    content;
  return (
    <S.Container>
      <S.TextWrapper>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
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
            <HeartIcon size={14} color="rgba(0, 0, 0, 0.5)" />
            <S.SubInfoText>{like}</S.SubInfoText>
          </S.SubInfoDiv>
          <S.SubInfoDiv>
            <ChatIcon size={14} color="rgba(0, 0, 0, 0.5)" />
            <S.SubInfoText>{chat}</S.SubInfoText>
          </S.SubInfoDiv>
        </S.SubInfoBox>
      </S.TextWrapper>
      <S.ImageWrapper>
        <S.Image src={imageUrl} />
      </S.ImageWrapper>
    </S.Container>
  );
}
