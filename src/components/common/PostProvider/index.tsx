import { createContext, ReactNode, useState } from "react";

import { PostListContentType } from "@/types";

interface createContextType {
  data: PostListContentType[] | null;
  handleSetData: (arg: PostListContentType[] | null) => void;
  handleDeleteData: (arg: number) => void;
}

export const PostContext = createContext<createContextType>({
  data: null,
  handleSetData: () => {},
  handleDeleteData: () => {},
});

interface Props {
  children: ReactNode;
}

export function PostProvider({ children }: Props) {
  const [data, setData] = useState<PostListContentType[] | null>(null);

  const handleSetData = (newData: PostListContentType[] | null) => {
    setData(newData);
  };

  const handleDeleteData = (postId: number) => {
    setData((prev) => prev?.filter((post) => post.id !== postId) || null);
  };

  return (
    <PostContext.Provider value={{ data, handleSetData, handleDeleteData }}>
      {children}
    </PostContext.Provider>
  );
}
