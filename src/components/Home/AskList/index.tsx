import { Fragment } from "react";

import { DetailModal } from "@/components/Detail/DetailModal";
import { PostDetail } from "@/components/Detail/PostDetail";
import { Divider } from "@/components/common/Divider";
import { AskItem } from "../AskItem";

import { useDetailModal } from "@/hooks/useDetailModal";

import * as S from "./style";

const mockData = [
  {
    id: 11,
    title: "침착맨 티셔츠 어디꺼에요?",
    description: "240411 방송에서 입은 티셔츠입니다.",
    tags: ["침착맨", "티셔츠"],
    writter: "홍길동",
    date: "20분 전",
    like: 30,
    chat: 20,
    imageUrl:
      "https://image.xportsnews.com/contents/images/upload/article/2023/0531/mb_1685508498644952.jpg",
  },
  {
    id: 22,
    title: "침착맨 티셔츠 어디꺼에요?",
    description: "240411 방송에서 입은 티셔츠입니다.",
    tags: ["침착맨", "티셔츠"],
    writter: "홍길동",
    date: "20분 전",
    like: 30,
    chat: 20,
    imageUrl:
      "https://image.xportsnews.com/contents/images/upload/article/2023/0531/mb_1685508498644952.jpg",
  },
  {
    id: 33,
    title: "침착맨 티셔츠 어디꺼에요?",
    description: "240411 방송에서 입은 티셔츠입니다.",
    tags: ["침착맨", "티셔츠"],
    writter: "홍길동",
    date: "20분 전",
    like: 30,
    chat: 20,
    imageUrl:
      "https://image.xportsnews.com/contents/images/upload/article/2023/0531/mb_1685508498644952.jpg",
  },
];

export function AskList() {
  const { isOpen, handleClose, handleOpen } = useDetailModal();

  return (
    <Fragment>
      <S.Container>
        {mockData.map((data, index) => (
          <Fragment key={data.id}>
            <AskItem
              data={data}
              onItemClick={() => handleOpen(data.id, `/post/${data.id}`)}
            />
            {index < mockData.length - 1 && <Divider />}
          </Fragment>
        ))}
      </S.Container>
      <DetailModal isOpen={isOpen} onOutSideClick={() => handleClose("/")}>
        <PostDetail />
      </DetailModal>
    </Fragment>
  );
}
