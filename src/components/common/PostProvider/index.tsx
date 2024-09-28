import { createContext, ReactNode, useState } from "react";

import { PostListContentType } from "@/types";

interface createContextType {
  posts: PostListContentType[] | null;
  handleSetPosts: (arg: PostListContentType[] | null) => void;
}

export const PostContext = createContext<createContextType>({
  posts: null,
  handleSetPosts: () => {},
});

interface Props {
  children: ReactNode;
}

export function PostProvider({ children }: Props) {
  const [posts, setPosts] = useState<PostListContentType[] | null>(null);

  const handleSetPosts = (newPosts: PostListContentType[] | null) => {
    setPosts(newPosts);
  };

  return (
    <PostContext.Provider value={{ posts, handleSetPosts }}>
      {children}
    </PostContext.Provider>
  );
}
