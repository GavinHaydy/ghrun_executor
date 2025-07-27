import type {ISettings} from "@/types/settingType.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const initialState: ISettings = {
  settings: {
    current_team_id: Cookies.get("team_id")??''
  },
  user_info: {
    id: 0,
    email: '',
    mobile: '',
    nickname: '',
    avatar: '',
    role_id: '',
    account: '',
    role_name: '',
    user_id: '',
    company_id: '',
    company_role_id: '',
    company_role_name: ''
  }
}


export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<ISettings>) => {
      state.settings = action.payload.settings;
      state.user_info = action.payload.user_info;
      localStorage.setItem('settings', JSON.stringify(action.payload))
    },
  }
});

export const { setSettings } = settingSlice.actions;
export default settingSlice.reducer;