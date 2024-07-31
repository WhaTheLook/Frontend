import { useContext } from "react";

import { GridList } from "@/components/common/GridList";
import { PostContext } from "@/components/common/PostProvider";

export function SharedPopular() {
  const { data } = useContext(PostContext);

  return <GridList data={data} />;
}
