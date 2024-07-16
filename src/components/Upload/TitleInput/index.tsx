import { ChangeEvent, memo } from "react";

import * as S from "./style";

interface Props {
  title: string;
  dispatcher: (arg: string) => void;
}

export const TitleInput = memo(function TitleInput({
  title,
  dispatcher,
}: Props) {
  const handleChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    dispatcher(value.trim());
  };

  return (
    <S.Container>
      <S.Input
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={handleChangeTitle}
      />
    </S.Container>
  );
});
