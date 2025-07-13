import {configureStore} from "@reduxjs/toolkit";

import themeReducer from "@/store/theme/themeSlice";
import settingReducer from "@/store/modules/settingSlice.ts";
import authReducer from "@/store/modules/authSlice.ts";
import langReducer from "@/store/lang.ts"

/**
 * @author gavinhaydy
 * @description 创建一个redux store
 */

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        setting: settingReducer,
        auth: authReducer,
        lang: langReducer,
        // user: userReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;