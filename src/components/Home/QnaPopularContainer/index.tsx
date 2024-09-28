import { FlatList } from "@/components/common/FlatList";
import { NothingInfo } from "@/components/common/NothingInfo";

import { usePostsContext } from "@/hooks/contexts/usePostsContext";

export function QnaPopularContainer() {
  const { posts } = usePostsContext();

  return (
    posts &&
    (posts.length === 0 ? (
      <NothingInfo contentType="home" />
    ) : (
      <FlatList data={posts} />
    ))
  );
}
