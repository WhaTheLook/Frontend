import { TitleInput } from "@/components/Upload/TitleInput";
import { DescriptionInput } from "@/components/Upload/DescriptionInput";
import { TagInput } from "@/components/Upload/TagInput";

import * as S from "./style";

export function Upload() {
  return (
    <S.Container>
      <S.Title>글 생성하기</S.Title>
      <TitleInput />
      <TagInput />
      <DescriptionInput />
    </S.Container>
  );
}
