import { GridList } from "@/components/common/GridList";
import { NothingInfo } from "@/components/common/NothingInfo";

import { usePostsContext } from "@/hooks/contexts/usePostsContext";

export function SharedPopularContainer() {
  const { posts } = usePostsContext();

  return (
    posts &&
    (posts.length === 0 ? (
      <NothingInfo contentType="home" />
    ) : (
      <GridList data={posts} />
    ))
  );
}
