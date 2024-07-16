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
      type: "IMAGES";
      payload: ImageUploadType[];
    }
  | {
      type: "TITLE";
      payload: string;
    }
  | {
      type: "DESCRITPTION";
      payload: string;
    }
  | {
      type: "TAGS";
      payload: string[];
    };

  
export interface UploadLayoutContextProps {
    data: UploadDataType,
    dispatch: Dispatch<ActionType>
}