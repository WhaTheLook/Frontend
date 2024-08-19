import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PostListContentType } from "@/types";

export interface MyPageUserInfoType {
    name: string;
    profileImage: string;
    kakaoId: string;
    commentCount: number;
    postCount: number;
}

interface MyPageState {
    userInfo: MyPageUserInfoType | null;
    postData: PostListContentType[] | null;
    commentData: PostListContentType[] | null;
}

const initialState: MyPageState = {
    userInfo: null,
    postData: null,
    commentData: null,
}

interface SetUserInfoPayload {
    userInfo: MyPageUserInfoType;
}

interface SetPostDataPayload {
    data: PostListContentType[];
}

interface SetCommentDataPayload {
    data: PostListContentType[];
}

const myPageSlice = createSlice({
    name: "myPage",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<SetUserInfoPayload>) => {
            const { userInfo } = action.payload;
            state.userInfo = userInfo;
        },
        setPostData: (state, action: PayloadAction<SetPostDataPayload>) => {
            const { data } = action.payload;
            state.postData = data;
        },
        setCommentData: (state, action: PayloadAction<SetCommentDataPayload>) => {
            const { data } = action.payload;
            state.commentData = data;
        }
    }
});

export const { setUserInfo, setPostData, setCommentData } = myPageSlice.actions;
export const myPageSliceReducer = myPageSlice.reducer;

export const selectUserInfo = (state: { myPage: MyPageState }) => state.myPage.userInfo;
export const selectPost = (state: { myPage: MyPageState }) => state.myPage.postData;
export const selectComment = (state: { myPage: MyPageState }) => state.myPage.commentData;
