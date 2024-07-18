import { Profile } from "@/components/Mypage/Profile";
import { MyWritting } from "@/components/Mypage/MyWritting";

import * as S from "./style";

export function MyPage() {
  return (
    <S.Container>
      <Profile />
      <MyWritting />
    </S.Container>
  );
}
