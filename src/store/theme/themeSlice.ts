// src/store/themeSlice.ts
import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";




export const themeSlice = createSlice({
    name: "theme",
    initialState: {mode: Cookies.get("theme")},
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
            Cookies.set("theme", action.payload);
        },
    },
});

export const { setMode } = themeSlice.actions;
export default themeSlice.reducer;
