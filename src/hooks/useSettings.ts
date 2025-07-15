import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export function useCurrentTeamId(): string {
    return useSelector((state: RootState) => state.setting.settings.current_team_id);
}