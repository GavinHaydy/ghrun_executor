// store/userSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {IAuthState} from "@/types/authType.ts";
import Cookies from "js-cookie"


const initialState: IAuthState = {
    companyId: Cookies.get('company_id'),
    uuid: Cookies.get('uuid'),
    token: Cookies.get('token'),
    teamId: Cookies.get('team_id')
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCompanyId: (state, action: PayloadAction<string>) => {
            state.companyId = action.payload;
            Cookies.set('company_id', action.payload);
        },
        setUuid: (state, action: PayloadAction<string>) => {
            state.uuid = action.payload;
            Cookies.set('uuid', action.payload);
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            Cookies.set('token', action.payload);
        },
        setTeamId: (state, action: PayloadAction<string>) => {
            state.teamId = action.payload;
            Cookies.set('team_id', action.payload);
        }
    },
});

export const { setCompanyId, setUuid, setToken, setTeamId } = userSlice.actions;
export default userSlice.reducer;
