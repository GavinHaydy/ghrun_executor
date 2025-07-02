import { configureStore } from "@reduxjs/toolkit";
// import themeReducer from "./themeSlice";
// import langReducer from "./lang.ts";
// import userReducer from './userSlice.ts'

/**
 * @author gavinhaydy
 * @description 创建一个redux store
 */
export const store = configureStore({
    reducer: {
        // theme: themeReducer,
        // lang: langReducer,
        // user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;