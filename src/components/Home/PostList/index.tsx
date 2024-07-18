import { Fragment } from "react";

import { SharedPosts } from "../SharedPosts";
import { QnaPosts } from "../QnaPosts";

interface Props {
  menuType: number;
  sortType: number;
}

export function PostList({ menuType, sortType }: Props) {
  return (
    <Fragment>
      {menuType === 0 ? (
        <QnaPosts sortType={sortType} />
      ) : (
        <SharedPosts sortType={sortType} />
      )}
    </Fragment>
  );
}
