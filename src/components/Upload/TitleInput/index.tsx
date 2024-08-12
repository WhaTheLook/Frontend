import { ChangeEvent, memo } from "react";

import { ErrorMessage } from "@/components/common/ErrorMessage";

import * as S from "./style";

interface Props {
  title: string;
  dispatcher: (arg: string) => void;
  error: boolean;
}

export const TitleInput = memo(function TitleInput({
  title,
  dispatcher,
  error,
}: Props) {
  const handleChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    dispatcher(value);
  };

  return (
    <S.Container>
      <S.Input
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={handleChangeTitle}
      />
      {error && <ErrorMessage message="제목을 입력해주세요" />}
    </S.Container>
  );
});
