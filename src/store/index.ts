import {combineReducers, configureStore} from "@reduxjs/toolkit";

import themeReducer from "@/store/theme/themeSlice";
import settingReducer from "@/store/modules/settingSlice.ts";
import authReducer from "@/store/modules/authSlice.ts";
import langReducer from "@/store/lang.ts"
import {persistReducer, persistStore} from "redux-persist";
import {configGenerator} from "@/store/persistPlugin.ts";

/**
 * @author gavinhaydy
 * @description 创建一个redux store
 */
// 持久化

// 包装各个 reducer
const rootReducer = combineReducers({
    auth: persistReducer(configGenerator('auth'), authReducer),
    theme: persistReducer(configGenerator('theme'), themeReducer),
    lang: langReducer,
    setting: settingReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // 关闭 redux-persist 的警告
        }),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persist = persistStore(store);