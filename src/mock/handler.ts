import { loginHandlers } from "./api/login";
import { qnaLatestHandlers } from "./api/QnaLatest";
import { qnaPopularHandlers } from "./api/QnaPopular";
import { shareLatestHandlers } from "./api/ShareLatest";
import { userInfoHandlers } from "./api/userInfo";

export const handlers = [
    ...qnaLatestHandlers,
    ...qnaPopularHandlers,
    ...shareLatestHandlers,
    ...loginHandlers,
    ...userInfoHandlers,
]