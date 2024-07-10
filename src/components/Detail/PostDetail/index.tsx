import * as S from "./style";

import { ImageWrapper } from "../ImageWrapper";
import { InfoWrapper } from "../InfoWrapper";
import { CommentWrapper } from "../CommentWrapper";

const mockImage = [
  "https://images.unsplash.com/photo-1626356843860-358c51b44f3e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1720088248201-6915ee7adf00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1681377835632-fe537691f5f3?q=80&w=1786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const mockData = {
  writter: "홍길동",
  profileImage:
    "https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  date: "2일전",
  title: "지디 옷 어디꺼?",
  description: "사진 설명",
  tags: ["지디", "티셔츠"],
  like: 10,
  chat: 20,
};

export function PostDetail() {
  return (
    <S.Container>
      <ImageWrapper images={mockImage} />
      <S.InfoWrapper>
        <S.PaddingFragment>
          <InfoWrapper content={mockData} />
          <CommentWrapper />
        </S.PaddingFragment>
      </S.InfoWrapper>
    </S.Container>
  );
}
