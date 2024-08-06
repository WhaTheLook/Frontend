export enum modalType {
    SIGNOUT = "SIGNOUT",
    DELETE_POST = "DELETE_POST",
    DELETE_ACCOUNT = "DELETE_ACCOUNT",
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
    POSTTYPE = "POSTTYPE",
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

export const POST_TYPE_LIST = [
    { id: 0, text: "정보 공유 글" },
    { id: 1, text: "정보 질문 글" },
];

export const MAX_LENGTH_USER_NAME = 20;

export const API_URL = "https://43.201.58.243.nip.io";

export enum sortOption {
    LATEST = "latest",
    POPULAR = "popular",
}

export enum categoryOption {
    QNA = '질문하기',
    SHARE = '정보공유',
}
interface GetPostAPIArgType {
    category: categoryOption;
    sortBy: sortOption;
    page: number;
    size: number;
    userId?: string;
}

export const API_PATH = {
    login: () => `${API_URL}/user/login`,
    userInfo: () => `${API_URL}/user/info`,
    postList: ({ category, sortBy, page, size, userId }: GetPostAPIArgType) => {
        const baseUrl = `${API_URL}/post/postList?page=${page}&size=${size}&category=${category}`;
        return userId ? `${baseUrl}&kakaoId=${userId}` : baseUrl;
    }
}

export const MAX_FETCH_LEGNTH = 10;
export const FLATITEM_SKELETON_COUNT = 3;