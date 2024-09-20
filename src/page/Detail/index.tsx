import { Suspense } from "react";

import { ApiErrorBoundary } from "@/components/common/ApiErrorBoundary";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { PostDetail } from "@/components/Detail/PostDetail";
import { DetailProvider } from "@/components/Detail/DetailProvider";

export function Detail() {
  return (
    <ApiErrorBoundary>
      <Suspense
        fallback={<LoadingSpinner color="#B2B2B2" isNoPadding={false} />}
      >
        <DetailProvider>
          <PostDetail />
        </DetailProvider>
      </Suspense>
    </ApiErrorBoundary>
  );
}
