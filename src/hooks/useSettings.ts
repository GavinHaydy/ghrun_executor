import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type {IUserInfo} from "@/types/settingType.ts";

export function useCurrentTeamId(): string {
    return useSelector((state: RootState) => state.setting.settings.current_team_id);
}
export function useUserInfo(): IUserInfo {
    return useSelector((state: RootState) => state.setting.user_info);
}