import { useState, Fragment } from "react";

import { GridList } from "@/components/common/GridList";

import { PostListType } from "@/types";

interface Props {
  sortType: number;
}

export function SharedPosts({ sortType }: Props) {
  const [data, setData] = useState<PostListType[]>([]);

  return (
    <Fragment>
      <GridList data={data} />
    </Fragment>
  );
}
