import { HeartIcon } from "@/components/Icons/HeartIcon";

import * as S from "./style";

interface Props {
  imageUrl: string;
  title: string;
  writter: string;
  date: string;
  like: number;
}

export function SharedItem({ imageUrl, title, writter, date, like }: Props) {
  return (
    <S.Container imageUrl={imageUrl}>
      <S.InfoWrapper>
        <S.InfoBox>
          <S.Title>{title}</S.Title>
          <S.InfoTextBox>
            <S.Writter>{writter}</S.Writter> · <S.Date>{date}</S.Date>
          </S.InfoTextBox>
        </S.InfoBox>
        <S.SubInfoBox>
          <HeartIcon size={20} />
          <S.HeartCount>{like}</S.HeartCount>
        </S.SubInfoBox>
      </S.InfoWrapper>
    </S.Container>
  );
}
