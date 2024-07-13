import { Label } from "../Label";

import * as S from "./style";

export function DescriptionInput() {
  return (
    <S.Container>
      <Label text="설명" htmlFor="description" />
      <S.Textarea
        placeholder="알고싶은 룩을 설명해주세요."
        name="description"
        id="description"
        rows={4}
      />
    </S.Container>
  );
}
