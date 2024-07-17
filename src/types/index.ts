import { UploadActionType } from "@/constants";
import { Dispatch } from "react";

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

export type UploadErrorKeys = (keyof UploadDataType)[];

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
      payload: UploadErrorKeys;
    }

  
export interface UploadLayoutContextProps {
    data: UploadDataType,
    dispatch: Dispatch<ActionType>
}