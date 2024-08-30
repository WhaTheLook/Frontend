import { Comment } from "@/components/Detail/Comment";

import { useDetailContext } from "@/hooks/useDetailContext";

import * as S from "./style";

export function CommentsWrapper() {
  const { data } = useDetailContext();
  const { comments } = data;

  return (
    <S.Container>
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
    </S.Container>
  );
}
