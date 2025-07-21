import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import i18n from "@/locales/i18n.ts";



export const langSlice = createSlice({
    name: "lang",
    initialState:{
        lang: Cookies.get("lang"),
    },
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload
            Cookies.set("lang", action.payload)
            i18n.changeLanguage(action.payload).then()
        }
    }
})
export const {setLang} = langSlice.actions
export default langSlice.reducer