import { createContext, ReactNode, useState } from "react";

import { PostListContentType } from "@/types";

interface createContextType {
  data: PostListContentType[] | null;
  handleSetData: (arg: PostListContentType[] | null) => void;
}

export const PostContext = createContext<createContextType>({
  data: null,
  handleSetData: () => {},
});

interface Props {
  children: ReactNode;
}

export function PostProvider({ children }: Props) {
  const [data, setData] = useState<PostListContentType[] | null>(null);

  const handleSetData = (newData: PostListContentType[] | null) => {
    setData(newData);
  };

  return (
    <PostContext.Provider value={{ data, handleSetData }}>
      {children}
    </PostContext.Provider>
  );
}
