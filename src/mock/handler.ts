import { loginHandlers } from "./api/login";
import { qnaLatestHandlers } from "./api/QnaLatest";
import { shareLatestHandlers } from "./api/ShareLatest";
import { userInfoHandlers } from "./api/userInfo";

export const handlers = [
    ...qnaLatestHandlers,
    ...shareLatestHandlers,
    ...loginHandlers,
    ...userInfoHandlers
]