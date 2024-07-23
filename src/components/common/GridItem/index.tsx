import { HeartIcon } from "@/components/Icons/HeartIcon";

import { PostListType } from "@/types";
import { ICON_SIZE } from "@/constants/style";

import * as S from "./style";

interface Props {
  data: PostListType;
  onItemClick: () => void;
}

export function GridItem({ data, onItemClick }: Props) {
  const { title, imageUrl, writter, date, like } = data;
  return (
    <S.Container $imageUrl={imageUrl[0]} onClick={onItemClick}>
      <S.InfoWrapper>
        <S.InfoBox>
          <S.Title>{title}</S.Title>
          <S.InfoTextBox>
            <S.Writter>{writter}</S.Writter> · <S.Date>{date}</S.Date>
          </S.InfoTextBox>
        </S.InfoBox>
        <S.SubInfoBox>
          <HeartIcon size={ICON_SIZE.SMALL} color="#FFFFFF" />
          <S.HeartCount>{like}</S.HeartCount>
        </S.SubInfoBox>
      </S.InfoWrapper>
    </S.Container>
  );
}
