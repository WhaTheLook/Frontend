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

export type DetailAction = 
  | {
      type: DetailActionType.SET_POST;
      payload: PostDetailInfoType;
    }
  | {
      type: DetailActionType.ADD_COMMENTS;
      payload: CommentsType;
    }
  | {
      type: DetailActionType.DELETE_COMMENT;
      payload: CommentsType["id"];
    }

export interface UploadLayoutContextProps {
    data: UploadDataType;
    dispatch: Dispatch<UploadAction>;
}

export interface ProfileFormValues {
  profileImage: File;
  profileName: string;
}

export interface ProfileEditType {
  user: {
    name: string;
    profile_image: string;
  };
}

// 🔽 fetch 데이터 타입
export interface UserInfoType {
  name: string;
  profileImage: string;
  kakaoId: string;
}

export interface CommentsType {
  id: number;
  author: UserInfoType;
  text: string;
  date: string;
  depth: number;
  children: CommentsType[];
}

export interface PostListContentType {
    id: number;
    author: UserInfoType;
    title: string;
    content: string;
    category: string;
    date: string;
    likeCount: number;
    likeYN: boolean;
    hashtags: string[];
    photoUrls: string[];
}

export interface PostDetailInfoType extends PostListContentType {
  deleteYN: boolean;
  comments: CommentsType[];
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

export interface PostListFetchType {
  totalPages: number;
  totalElements: number;
  size: number;
  content: PostListContentType[];
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
  empty: true
}

export type ProtectedPathname =
  | "saved"
  | "upload"
  | "profile"
  | "tokenExpired"
  | "login";