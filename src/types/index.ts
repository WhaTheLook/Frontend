import { Dispatch } from "react";

import { UploadActionType } from "@/constants";

export interface MenuListType {
  id: number;
  text: string;
}

export interface ImageUploadType {
    id: string;
    file: File;
} 

export interface UploadDataValidationType<T> {
  data: T;
  validation: boolean;
}

export interface UploadDataType {
    postType: UploadDataValidationType<number | null>;
    images: UploadDataValidationType<ImageUploadType[]>;
    title: UploadDataValidationType<string>;
    description: UploadDataValidationType<string>;
    tags: UploadDataValidationType<string[]>;
}

export type UploadErrorKeys = keyof UploadDataType;

export type ActionType =
  | {
      type: UploadActionType.POSTTYPE;
      payload: number;
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

  
export interface UploadLayoutContextProps {
    data: UploadDataType;
    dispatch: Dispatch<ActionType>;
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

export interface PostListContentType {
    id: number;
    author: UserInfoType;
    title: string;
    content: string;
    category: string;
    date: string;
    likeCount: number;
    likeYN: boolean;
    commentCount: number;
    hashtags: string[];
    photoUrls: string[];
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
