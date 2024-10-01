import { Dispatch } from "react";

import { DetailActionType, UploadActionType } from "@/constants";

export interface MenuListType {
  id: number;
  text: string;
}

export interface ImageUploadType {
    id: string;
    file: File;
}

export type postTypeType = "정보공유" | "질문하기";

export interface UploadDataValidationType<T> {
  data: T;
  validation: boolean;
}

export interface EditDataType {
    postType: postTypeType;
    images: ImageUploadType[];
    title: string;
    description: string;
    tags: string[];
}

export interface UploadDataType {
    postType: UploadDataValidationType<postTypeType | null>;
    images: UploadDataValidationType<ImageUploadType[]>;
    title: UploadDataValidationType<string>;
    description: UploadDataValidationType<string>;
    tags: UploadDataValidationType<string[]>;
}

export type UploadErrorKeys = keyof UploadDataType;

export type UploadAction =
  | {
      type: UploadActionType.POSTTYPE;
      payload: postTypeType;
    }
  | {
      type: UploadActionType.IMAGES;
      payload: ImageUploadType[];
    }
  | {
      type: UploadActionType.TITLE;
      payload: string;
    }
  | {
      type: UploadActionType.DESCRITPTION;
      payload: string;
    }
  | {
      type: UploadActionType.TAGS;
      payload: string[];
    }
  | {
      type: UploadActionType.VALIDATE;
      payload: UploadErrorKeys[];
    }
  | {
      type: UploadActionType.RESET;
      payload: null;
    }
  | {
      type: UploadActionType.EDIT;
      payload: EditDataType;
    }

export type DetailAction = 
  | {
      type: DetailActionType.SET_POST;
      payload: PostDetailInfoType;
    }
  | {
      type: DetailActionType.ADD_COMMENTS;
      payload: CommentsViewType;
    }
  | {
      type: DetailActionType.DELETE_COMMENT;
      payload: CommentsType["id"];
    }
  | {
      type: DetailActionType.UPDATE_COMMENT;
      payload: { commentId: CommentsType["id"], newText: CommentsType["text"] };
    }
  | {
      type: DetailActionType.SET_COMMENT;
      payload: CommentsViewType[];
    }
  | {
      type: DetailActionType.ADD_REPLY_COMMENT;
      payload: { newComment: CommentsType, parentId: CommentsType["id"] };
    }
  | {
      type: DetailActionType.SET_REPLY_COMMENT;
      payload: { newComments: CommentsType[], parentId: CommentsType["id"] };
    }
  | {
      type: DetailActionType.SET_ACCEPT_COMMENT;
      payload: CommentsType;
    }
  | {
      type: DetailActionType.RESET_ACCEPT_COMMENT;
      payload: CommentsType;
    }

export interface UploadLayoutContextProps {
    data: UploadDataType;
    dispatch: Dispatch<UploadAction>;
}

export interface ProfileFormValues {
  profileImageFile: File;
  profileName: string;
}

export interface ProfileEditType {
  user: {
    name: string;
    profile_image: string;
  };
}

export interface LoginFetchType {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfoType {
  kakaoId: string;
  name: string;
  profileImage: string;
}

export interface CommentsType {
  accept: boolean;
  author: UserInfoType;
  childrenCount: number;
  date: string;
  id: number;
  targetUser: UserInfoType;
  text: string;
}

export interface CommentsViewType extends CommentsType {
  children: CommentsViewType[]
}

export interface PostListContentType {
    id: number;
    author: UserInfoType;
    title: string;
    content: string;
    category: postTypeType;
    commentCount: number;
    date: string;
    likeCount: number;
    likeYN: boolean;
    hashtags: string[];
    photoUrls: string[];
}

export interface PostDetailInfoType extends PostListContentType {
  accept: CommentsType | null;
  deleteYN: boolean;
  comments: CommentsViewType[];
}

export interface UserInfoFetchType {
  kakaoId: string;
  email: string;
  name: string;
  profileImage: string;
  date: string | null;
  postCount: number;
  commentCount: number;
}

export interface ListFetchType<T> {
  size: number;
  content: T[];
  number: number;
  sort: {
    empty: true;
    sorted: true;
    unsorted: true
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: true;
      sorted: true;
      unsorted: true
    };
    paged: true;
    pageNumber: number;
    pageSize: number;
    unpaged: true
  };
  first: true;
  last: true;
  empty: true;
}

export type ProtectedPathname =
  | "saved"
  | "upload"
  | "profile"
  | "tokenExpired"
  | "login";

export interface SearchListFetchType {
  posts: ListFetchType<PostListContentType>;
  total: number;
}