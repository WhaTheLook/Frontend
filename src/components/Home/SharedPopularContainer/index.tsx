import { useContext } from "react";

import { GridList } from "@/components/common/GridList";
import { PostContext } from "@/components/common/PostProvider";
import { NothingInfo } from "@/components/common/NothingInfo";

export function SharedPopularContainer() {
  const { data } = useContext(PostContext);

  return (
    data &&
    (data.length === 0 ? (
      <NothingInfo contentType="home" />
    ) : (
      <GridList data={data} />
    ))
  );
}
