// store/userSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {IAuthState} from "@/types/authType.ts";
import Cookies from "js-cookie"


const initialState: IAuthState = {
    companyId: localStorage.getItem('company_id'),
    uuid: localStorage.getItem('uuid'),
    token: Cookies.get('token'),
    teamId: localStorage.getItem('team_id')
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCompanyId: (state, action: PayloadAction<string>) => {
            state.companyId = action.payload;
            localStorage.setItem('company_id', action.payload);
        },
        setUuid: (state, action: PayloadAction<string>) => {
            state.uuid = action.payload;
            localStorage.setItem('uuid', action.payload);
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        setTeamId: (state, action: PayloadAction<string>) => {
            state.teamId = action.payload;
            localStorage.setItem('team_id', action.payload);
        }
    },
});

export const { setCompanyId, setUuid, setToken, setTeamId } = userSlice.actions;
export default userSlice.reducer;
