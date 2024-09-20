import { Fragment } from "react";

import { SharedPosts } from "../SharedPosts";
import { QnaPosts } from "../QnaPosts";

interface Props {
  menuType: number;
}

export function PostList({ menuType }: Props) {
  return <Fragment>{menuType === 0 ? <QnaPosts /> : <SharedPosts />}</Fragment>;
}
