import { loginHandlers } from "./api/login";
import { qnaLatestHandlers } from "./api/QnaLatest";
import { shareLatestHandlers } from "./api/ShareLatest";

export const handlers = [
    ...qnaLatestHandlers,
    ...shareLatestHandlers,
    ...loginHandlers
]