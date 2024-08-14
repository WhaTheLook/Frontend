import { Fragment } from "react";

import { QnaLatestContainer } from "@/components/Home/QnaLatestContainer";
import { QnaPopularContainer } from "@/components/Home/QnaPopularContainer";

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
          <QnaLatestContainer />
        </QnaLatestFetcher>
      ) : (
        <QnaPopularFetcher>
          <QnaPopularContainer />
        </QnaPopularFetcher>
      )}
    </Fragment>
  );
}
