export enum modalType {
    SIGNOUT = "SIGNOUT",
    DELETE = "DELETE",
}

export const TOGGLE_SEARCH_HISTORY = "toggleSearchHistory";
export const SEARCHED_HISTORY = "searchedHistory";
export const SEARCHED_HISTORY_MAX_LENGTH = 10;

export const TAGS_MAX_COUNT = 5;

export const IMAGE_UPLOAD_MAX_COUNT = 5;
export const ALERT_MESSAGE = {
    IMAGE_UPLOAD_COUNT_OVER: `이미지 최대 ${IMAGE_UPLOAD_MAX_COUNT}개까지 업로드 가능해요.`
}

export enum UploadActionType {
    TITLE = "TITLE",
    DESCRITPTION = "DESCRITPTION",
    TAGS = "TAGS",
    IMAGES = "IMAGES",
    VALIDATE = "VALIDATE",
    RESET = "RESET",
}

export enum PathnameType {
    UPLOAD = "/upload",
    PROFILE = "/profile/edit",
}

export const HOME_MENU_LIST = [
    { id: 0, text: "정보 질문" },
    { id: 1, text: "정보 공유" },
];

export const MYPAGE_MENU_LIST = [
    { id: 0, text: "내 게시글" },
    { id: 1, text: "내 댓글" },
];

export const SORT_LIST = [
    { id: 0, text: "최신순" },
    { id: 1, text: "인기순" },
];

export const MAX_LENGTH_USER_NAME = 20;