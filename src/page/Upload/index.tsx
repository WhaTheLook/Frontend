import { ImageInput } from "@/components/Upload/ImageInput";
import { TitleInput } from "@/components/Upload/TitleInput";
import { TagInput } from "@/components/Upload/TagInput";
import { DescriptionInput } from "@/components/Upload/DescriptionInput";

import * as S from "./style";

export function Upload() {
  return (
    <S.Container>
      <ImageInput />
      <TitleInput />
      <DescriptionInput />
      <TagInput />
    </S.Container>
  );
}
