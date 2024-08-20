import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authSliceReducer } from "./slice/authSlice";
import { myPageSliceReducer } from "./slice/myPageSlice";

const authPersistConfig = {
    key: 'auth',
    storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSliceReducer);

const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    myPage: myPageSliceReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
