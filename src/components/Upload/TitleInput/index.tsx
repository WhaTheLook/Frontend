import { Label } from "../Label";

import * as S from "./style";

export function TitleInput() {
  return (
    <S.Container>
      <Label text="제목" htmlFor="title" />
      <S.Input
        type="text"
        placeholder="제목을 입력해주세요"
        name="title"
        id="title"
      />
    </S.Container>
  );
}
