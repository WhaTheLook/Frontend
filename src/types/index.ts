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
    images: UploadDataValidationType<ImageUploadType[]>;
    title: UploadDataValidationType<string>;
    description: UploadDataValidationType<string>;
    tags: UploadDataValidationType<string[]>;
}

export type UploadErrorKeys = keyof UploadDataType;

export type ActionType =
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

export interface PostListType {
  id: number;
  title: string;
  content: string; 
  tags: string[]; 
  writter: string;
  date: string;
  like: number;
  chat: number;
  category: string;
  imageUrl: string[]; 
}