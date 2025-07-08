// src/store/themeSlice.ts
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

interface ThemeState {
    mode: ThemeMode;
}

const initialState: ThemeState = {
    mode: "light",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
        },
    },
});

export const { setMode } = themeSlice.actions;
export default themeSlice.reducer;
