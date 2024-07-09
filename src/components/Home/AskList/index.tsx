import { Fragment } from "react";

import { AskItem } from "../AskItem";
import { Divider } from "@/components/common/Divider";

import * as S from "./style";

const mockData = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
  return (
    <S.Container>
      {mockData.map((content, index) => (
        <Fragment key={content.id}>
          <AskItem content={content} />
          {index < mockData.length - 1 && <Divider />}
        </Fragment>
      ))}
    </S.Container>
  );
}
