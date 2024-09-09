import * as S from "./style";

interface Props {
  onClick: () => void;
}

export function PostToastError({ onClick }: Props) {
  return (
    <S.Container>
      <S.Text>이후 게시글을 불러오는데 실패했어요.</S.Text>
      <S.RetryButton onClick={onClick}>다시 시도</S.RetryButton>
    </S.Container>
  );
}
