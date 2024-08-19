import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authSliceReducer } from "./slice/authSlice";
import { myPageSliceReducer } from "./slice/myPageSlice";

const reducers = combineReducers({
    auth: authSliceReducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const myPageStore = configureStore({
    reducer: {
        myPage: myPageSliceReducer
    }
})

export const persistor = persistStore(store);
