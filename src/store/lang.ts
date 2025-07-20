import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";



export const langSlice = createSlice({
    name: "lang",
    initialState:{
        lang: Cookies.get("lang"),
    },
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload
        }
    }
})
export const {setLang} = langSlice.actions
export default langSlice.reducer