import { UploadActionType } from "@/constants";
import { Dispatch } from "react";

export interface ImageUploadType {
    id: string;
    file: File;
} 

export interface UploadDataType {
    images: ImageUploadType[];
    title: string;
    description: string;
    tags: string[];
}

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
    };

  
export interface UploadLayoutContextProps {
    data: UploadDataType,
    dispatch: Dispatch<ActionType>
}