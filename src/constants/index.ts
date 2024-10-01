import { postTypeType } from "@/types";

export enum modalType {
    SIGNIN = "SIGNIN",
    SIGNOUT = "SIGNOUT",
    DELETE_POST = "DELETE_POST",
    DELETE_ACCOUNT = "DELETE_ACCOUNT",
}

export enum modalLocationType {
    HEAHDER = "HEADER",
    DETAIL = "DETAIL",
    PROFILE_EDIT = "PROFILE_EDIT",
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
    EDIT = "EDIT",
}

export enum DetailActionType {
    SET_POST = "SET_POST",
    ADD_COMMENTS = "ADD_COMMENTS",
    DELETE_COMMENT = "DELETE_COMMENT",
    UPDATE_COMMENT = "UPDATE_COMMENT",
    SET_COMMENT = "SET_COMMENT",
    ADD_REPLY_COMMENT = "ADD_REPLY_COMMENT",
    SET_REPLY_COMMENT = "SET_REPLY_COMMENT",
    SET_ACCEPT_COMMENT = "SET_ACCEPT_COMMENT",
    RESET_ACCEPT_COMMENT = "RESET_ACCEPT_COMMENT",
}

export enum PathnameType {
    CREATE = "/create",
    PROFILE = "/profile/edit",
    POST_EDIT = "/post/edit",
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
    { id: "질문하기", text: "정보 질문 글" },
    { id: "정보공유", text: "정보 공유 글" },
];

export const MAX_LENGTH_USER_NAME = 20;

export const API_URL = import.meta.env.VITE_API_URL;

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

interface SearchPostListArgType extends GetPostAPIArgType {
    searchQuery: string;
}

interface CommentListArgType {
    postId: number;
    size: number;
    lastCommentId?: number;
}

interface ReplyCommentListArgType {
    postId: number;
    parentId: number;
    size: number;
    lastCommentId?: number;
}

export const API_PATH = {
    login: () => `${API_URL}/user/login`,
    userInfo: () => `${API_URL}/user/info`,
    deleteUser: ({ userId }: { userId: string }) => `${API_URL}/user/delete/${userId}`,
    postList: ({ category, sortBy, size, lastPostId }: PostListArgType) => {
        const baseUrl = `${API_URL}/post/postList?size=${size}&category=${category}&sortBy=${sortBy}`;
        return lastPostId ? `${baseUrl}&lastPostId=${lastPostId}` : baseUrl;
    },
    postDetailInfo: ({ postId }: { postId: number }) => `${API_URL}/post/${postId}`,
    tokenCheck: () => `${API_URL}/user/token/check`,
    tokenReIssue: () => `${API_URL}/user/refresh`,
    createPost: () => `${API_URL}/post/create`,
    updatePost: () => `${API_URL}/post/update`,
    likePost: () => `${API_URL}/post/like`,
    userPostList: ({ userId, sortBy, size, lastPostId }: UserPostListArgType) => {
        const baseUrl = `${API_URL}/user/${userId}/post?size=${size}&sortBy=${sortBy}`;
        return lastPostId ? `${baseUrl}&lastPostId=${lastPostId}` : baseUrl;
    },
    userCommentList: ({ userId, sortBy, size, lastPostId }: UserPostListArgType) => {
        const baseUrl = `${API_URL}/user/${userId}/commentPost?size=${size}&sortBy=${sortBy}`;
        return lastPostId ? `${baseUrl}&lastPostId=${lastPostId}` : baseUrl;
    },
    updateUserInfo: () => `${API_URL}/user/update`,
    deletePost: ({ postId }: { postId: number }) => `${API_URL}/post/delete/${postId}`,
    bookmarkList: ({ userId, lastPostId, size, sortBy }: UserPostListArgType) => {
        const baseUrl = `${API_URL}/user/${userId}/likePost?size=${size}&sortBy=${sortBy}`;
        return lastPostId ? `${baseUrl}&lastPostId=${lastPostId}` : baseUrl;
    },
    searchPosts: ({ searchQuery, lastPostId, size, sortBy }: SearchPostListArgType) => {
        const baseUrl = `${API_URL}/post/postList/${searchQuery}?size=${size}&sortBy=${sortBy}`;
        return lastPostId ? `${baseUrl}&lastPostId=${lastPostId}` : baseUrl;
    },
    createComment: () => `${API_URL}/post/comment/create`, 
    commentList: ({ postId, size, lastCommentId }: CommentListArgType) => {
        const baseUrl = `${API_URL}/post/${postId}/comment?size=${size}`;
        return lastCommentId ? `${baseUrl}&lastCommentId=${lastCommentId}` : baseUrl;
    },
    deleteComment: ({ commentId }: { commentId: number }) => `${API_URL}/post/${commentId}/delete`,
    updateComment: ({ commentId }: { commentId: number }) => `${API_URL}/post/${commentId}/update`,
    replyCommentList: ({ postId, parentId, size, lastCommentId }: ReplyCommentListArgType) => {
        const baseUrl = `${API_URL}/post/${postId}/${parentId}/comment?size=${size}`;
        return lastCommentId ? `${baseUrl}&lastCommentId=${lastCommentId}` : baseUrl;
    },
    acceptComment: ({ postId, commentId }: { postId: number, commentId: number }) => {
        return `${API_URL}/post/${postId}/${commentId}/accept`;
    }
}

export const MAX_FETCH_SIZE_FLAT = 12;
export const MAX_FETCH_SIZE_GRID = 12;
export const FLATITEM_SKELETON_COUNT = 5;
export const GRIDITEM_SKELETON_COUNT = 12;
export const MAX_FETCH_SIZE_COMMENT = 10;

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const TOAST_MESSAGE = {
    tokenExpired: () => "세션이 만료되었어요. 로그인 후 다시 시도해주세요.",
    likeError: () => "게시글 좋아요에 실패했어요. 다시 시도해주세요.",
    failCreatePost: () => "게시글을 작성하는데 실패했어요. 다시 시도해주세요.",
    failUpdatePost: () => "게시글을 수정하는데 실패했어요. 다시 시도해주세요.",
    successDeletePost: () => "게시글을 삭제했어요.",
    failDeletePost: () => "게시글 삭제하는데 실패했어요. 다시 시도해주세요.",
    failUpdateUserInfo: () => "회원 정보를 수정하는데 실패했어요. 다시 시도해주세요.",
    failCreateComment: () => "댓글을 작성하는데 실패했어요. 다시 시도해주세요.",
    failDeleteComment: () => "댓글을 삭제하는데 실패했어요. 다시 시도해주세요.",
    successDeleteComment: () => "댓글을 삭제했어요.",
    failUpdateComment: () => "댓글을 수정하는데 실패했어요. 다시 시도해주세요.",
    successUpdateComment: () => "댓글을 수정했어요.",
    failAcceptComment: () => "댓글을 채택하는데 실패했어요. 다시 시도해주세요.",
    successAcceptComment: () => "댓글을 채택했어요.",
    failCancleAcceptComment: () => "댓글을 채택 취소하는데 실패했어요. 다시 시도해주세요.",
    successCancleAcceptComment: () => "댓글 채택을 취소했어요.",
    failDeleteUserAccount: () => "계정을 삭제하는 데 실패했어요. 다시 시도해주세요.",
}

export const FETCH_TIME = 10_000;
export const TIMEOUT_ERROR = "TimeoutError";

export const TIME_UNITS = {
    millisecond: 1,
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000, 
    year: 365 * 24 * 60 * 60 * 1000,
};

interface QueryKeyAuth {
    accessToken: string | null;
    refreshToken: string | null;
}

interface QueryKeyHome {
    category: postTypeType;
    sort: "latest" | "popular";
}

export const QUERY_KEY = {
    home: ({ category, sort }: QueryKeyHome) => ["home", category, sort],
    myPosts: () => ["myPosts"],
    myComments: () => ["myComments"],
    auth: ({ accessToken, refreshToken }: QueryKeyAuth) => ['auth', accessToken, refreshToken],
    detail: (postId: number) => ["detail", String(postId)],
    image: (imageUrl: string) => ["image", imageUrl],
    profile: () => ["profile"],
    postComments: (postId: number) => ["postComment", String(postId)],
    replyComment: ({ postId, parentId }: { postId: number, parentId: number }) => ["replyComment", String(postId), String(parentId)],
    search: (query: string) => ["search", query],
    bookmark: () => ["bookmark"],
    loginUserInfo: () => ["userInfo"]
}