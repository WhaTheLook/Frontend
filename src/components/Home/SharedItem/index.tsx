import { HeartIcon } from "@/components/Icons/HeartIcon";

import * as S from "./style";

interface Props {
  data: {
    imageUrl: string;
    title: string;
    writter: string;
    date: string;
    like: number;
  };
  onItemClick: () => void;
}

export function SharedItem({ data, onItemClick }: Props) {
  const { title, imageUrl, writter, date, like } = data;
  return (
    <S.Container $imageUrl={imageUrl} onClick={onItemClick}>
      <S.InfoWrapper>
        <S.InfoBox>
          <S.Title>{title}</S.Title>
          <S.InfoTextBox>
            <S.Writter>{writter}</S.Writter> · <S.Date>{date}</S.Date>
          </S.InfoTextBox>
        </S.InfoBox>
        <S.SubInfoBox>
          <HeartIcon size={20} color="#FFFFFF" />
          <S.HeartCount>{like}</S.HeartCount>
        </S.SubInfoBox>
      </S.InfoWrapper>
    </S.Container>
  );
}
