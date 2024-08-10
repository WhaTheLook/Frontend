import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserInfoType } from "@/types";

interface AuthState {
    isSignIn: boolean;
    user: UserInfoType | null;
}

const initialState: AuthState = {
    isSignIn: false,
    user: null,
}

interface SetCredentialPayload {
    user: UserInfoType;
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignIn: (state) => {
            state.isSignIn = true;
        },
        setCredential: (state, action: PayloadAction<SetCredentialPayload>) => {
            const { user } = action.payload;
            state.isSignIn = true;
            state.user = user;
        },
        logout: (state) => {
            state.isSignIn = false;
            state.user = null;
        }
    }
});

export const { setSignIn, setCredential, logout } = authSlice.actions;
export const authSliceReducer =  authSlice.reducer;

export const selectCurrentSignStatus = (state: { auth: AuthState }) => state.auth.isSignIn;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
