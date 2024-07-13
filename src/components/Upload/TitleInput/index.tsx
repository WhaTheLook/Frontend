import * as S from "./style";

export function TitleInput() {
  return (
    <S.Container>
      <S.Input
        type="text"
        placeholder="제목을 입력해주세요."
        name="title"
        id="title"
      />
    </S.Container>
  );
}
