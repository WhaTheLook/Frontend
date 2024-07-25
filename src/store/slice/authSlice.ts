import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserInfoType } from "@/types";

interface AuthState {
    isSignIn: boolean;
    user: UserInfoType | null;
    token: string | null;
}

const initialState: AuthState = {
    isSignIn: false,
    user: null,
    token: null,
}

interface SetCredentialPayload {
    user: UserInfoType;
    accessToken: string;
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredential: (state, action: PayloadAction<SetCredentialPayload>) => {
            const { user, accessToken } = action.payload;
            state.isSignIn = true;
            state.user = user;
            state.token = accessToken;
        },
        logout: (state) => {
            state.isSignIn = false;
            state.user = null;
            state.token = null;
        }
    }
});

export const { setCredential, logout } = authSlice.actions;
export const authSliceReducer =  authSlice.reducer;

export const selectCurrentSignStatus = (state: { auth: AuthState }) => state.auth.isSignIn;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
