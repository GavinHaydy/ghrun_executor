import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '@/store';
import {setCompanyId, setToken, setUuid,setTeamId} from '@/store/modules/authSlice';
import { useCallback } from 'react';

export function useAuthInfo() {
    const dispatch = useDispatch<AppDispatch>();

    const companyId = useSelector((state: RootState) => state.auth.companyId);
    const uuid = useSelector((state: RootState) => state.auth.uuid);
    const token = useSelector((state: RootState) => state.auth.token);
    const teamId = useSelector((state: RootState) => state.auth.teamId);

    // 更新 companyId，自动写 localStorage
    const updateCompanyId = useCallback(
        (companyId: string) => {
            dispatch(setCompanyId(companyId));
        },
        [dispatch]
    );

    // 更新 uuid
    const updateUuid = useCallback(
        (uuid: string) => {
            dispatch(setUuid(uuid));
        },
        [dispatch]
    );

    const updateToken = useCallback(
        (token: string) => {
            dispatch(setToken(token));
        },
        [dispatch]
    );

    const updateTeamId = useCallback(
        (id: string) => {
            dispatch(setTeamId(id));
        },
        [dispatch]
    );

    return {
        companyId,
        uuid,
        token,
        teamId,
        updateCompanyId,
        updateUuid,
        updateToken,
        updateTeamId
    };
}
