import { QnaLatestContainer } from "@/components/Home/QnaLatestContainer";

import { QnaLatestFetcher } from "@/fetcher/Home/QnaLatestFetcher";

export function QnaPosts() {
  return (
    <QnaLatestFetcher>
      <QnaLatestContainer />
    </QnaLatestFetcher>
  );
}
