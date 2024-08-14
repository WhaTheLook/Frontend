import { postTypeType } from "@/types";

export enum modalType {
    SIGNOUT = "SIGNOUT",
    DELETE_POST = "DELETE_POST",
    DELETE_ACCOUNT = "DELETE_ACCOUNT",
}

export enum toastType {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR", 
    WARNING = "WARNING",
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

export const POST_TYPE_LIST: { id: postTypeType, text: string}[] = [
    { id: "정보공유", text: "정보 공유 글" },
    { id: "질문하기", text: "정보 질문 글" },
];

export const MAX_LENGTH_USER_NAME = 20;

export const API_URL = "https://43.201.58.243.nip.io";

export enum sortOption {
    LATEST = "recent",
    POPULAR = "popular",
}

export enum categoryOption {
    QNA = '질문하기',
    SHARE = '정보공유',
}

interface GetPostAPIArgType {
    sortBy: sortOption;
    size: number;
    lastPostId?: number;
}

interface PostListArgType extends GetPostAPIArgType{
    category: categoryOption;
}

interface UserPostListArgType extends GetPostAPIArgType{
    userId: string;
}

export const API_PATH = {
    login: () => `${API_URL}/user/login`,
    userInfo: () => `${API_URL}/user/info`,
    postList: ({ category, sortBy, size, lastPostId }: PostListArgType) => {
        const baseUrl = `${API_URL}/post/postList?size=${size}&category=${category}&sortBy=${sortBy}`;
        return lastPostId ? `${baseUrl}&lastPostId=${lastPostId}` : baseUrl;
    },
    postDetailInfo: ({ postId, userId }: { postId: number, userId?: string}) => {
        const baseUrl = `${API_URL}/post/${postId}`;
        return userId ? `${baseUrl}?kakaoId=${userId}` : baseUrl;
    },
    tokenCheck: () => `${API_URL}/user/token/check`,
    tokenReIssue: () => `${API_URL}/user/refresh`,
    createPost: () => `${API_URL}/post/create`,
    likePost: () => `${API_URL}/post/like`,
    userPostList: ({ userId, sortBy, size, lastPostId }: UserPostListArgType) => {
        const baseUrl = `${API_URL}/user/${userId}/post?size=${size}&sortBy=${sortBy}`;
        return lastPostId ? `${baseUrl}&lastPostId=${lastPostId}` : baseUrl;
    },
}

export const MAX_FETCH_LEGNTH = 10;
export const FLATITEM_SKELETON_COUNT = 4;

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";