import { Fragment } from "react";

import { DetailModal } from "@/components/Detail/DetailModal";
import { PostDetail } from "@/components/Detail/PostDetail";
import { SharedItem } from "../SharedItem";

import { useDetailModal } from "@/hooks/useDetailModal";

import * as S from "./style";

const mockData = [
  {
    id: 1,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
    category: false,
  },
  {
    id: 2,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
    category: false,
  },
  {
    id: 3,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
    category: false,
  },
  {
    id: 4,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
    category: false,
  },
  {
    id: 5,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
    category: false,
  },
  {
    id: 6,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
    category: false,
  },
];

export function SharedList() {
  const { isOpen, handleOpen, handleClose } = useDetailModal();

  return (
    <Fragment>
      <S.Container>
        {mockData.map((data) => (
          <SharedItem
            key={data.id}
            data={data}
            onItemClick={() => handleOpen(data.id, `post/${data.id}`)}
          />
        ))}
      </S.Container>
      <DetailModal isOpen={isOpen} onOutSideClick={() => handleClose("/")}>
        <PostDetail />
      </DetailModal>
    </Fragment>
  );
}
