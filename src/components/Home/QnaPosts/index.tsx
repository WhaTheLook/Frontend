import { Fragment } from "react";

import { QnaLatest } from "@/components/Home/QnaLatest";
import { QnaPopular } from "@/components/Home/QnaPopular";

import { QnaLatestFetcher } from "@/fetcher/QnaLatestFetcher";
import { QnaPopularFetcher } from "@/fetcher/QnaPopularFetcher";

interface Props {
  sortType: number;
}

export function QnaPosts({ sortType }: Props) {
  return (
    <Fragment>
      {sortType === 0 ? (
        <QnaLatestFetcher>
          <QnaLatest />
        </QnaLatestFetcher>
      ) : (
        <QnaPopularFetcher>
          <QnaPopular />
        </QnaPopularFetcher>
      )}
    </Fragment>
  );
}
