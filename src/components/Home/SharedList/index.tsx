import { useState } from "react";
import { createPortal } from "react-dom";

import { DetailModal } from "@/components/Detail/DetailModal";
import { PostDetail } from "@/components/Detail/PostDetail";
import { SharedItem } from "../SharedItem";

import * as S from "./style";

const mockData = [
  {
    id: 1,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
  },
  {
    id: 2,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
  },
  {
    id: 3,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
  },
  {
    id: 4,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
  },
  {
    id: 5,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
  },
  {
    id: 6,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
  },
  {
    id: 7,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
  },
  {
    id: 8,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
  },
  {
    id: 9,
    imageUrl: "https://i1.sndcdn.com/artworks-000227430562-am04j1-t500x500.jpg",
    title: "지디가 입은 옷 궁금해요",
    writter: "어나니머스",
    date: "20분전",
    like: 20,
  },
];

export function SharedList() {
  const [showModal, setShowModal] = useState(false);
  const element = document.getElementById("modal") as HTMLElement;

  const handleCloseModal = () => {
    setShowModal(false);
    history.replaceState({}, "", "/");
  };

  const handleItemClick = (id: number) => {
    setShowModal(true);
    history.replaceState({ modalPostId: id }, "", `/post/${id}`);
  };

  return (
    <>
      <S.Container>
        {mockData.map(({ id, imageUrl, title, writter, date, like }) => (
          <SharedItem
            key={id}
            imageUrl={imageUrl}
            title={title}
            writter={writter}
            date={date}
            like={like}
            onItemClick={() => handleItemClick(id)}
          />
        ))}
      </S.Container>
      {showModal &&
        createPortal(
          <DetailModal onOutSideClick={handleCloseModal}>
            <PostDetail />
          </DetailModal>,
          element
        )}
    </>
  );
}
