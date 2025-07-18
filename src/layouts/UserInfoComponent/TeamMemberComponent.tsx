import {Input, Modal, Table} from "antd";
import {forwardRef, useImperativeHandle, useState} from "react";
import {useTranslation} from "react-i18next";
import type {ITeamMemberList} from "@/types/teamType.ts";
import dayjs from "dayjs";

export interface TeamMemberModalRef {
    open: (teamId: string) => void
}
interface TeamMemberModalProps {
    data: ITeamMemberList
}

export const TeamMemberComponent = forwardRef<TeamMemberModalRef,TeamMemberModalProps>(
    ({data}, ref) => {

        const {t} = useTranslation()
        const [visible, setVisible] = useState<boolean>(false)

        // ✅ 暴露 open 方法并设置 team_id
        useImperativeHandle(ref, () => ({
            open: (teamId: string) => {
                console.log(teamId)
                setVisible(true);
            }
        }));

        const columns = [
            {
                title: t("table.member"),
                dataIndex: 'account',
            },
            {
                title: t('table.joinDate'),
                dataIndex: 'join_time_sec',
                render: (time: number) => {
                    return dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            {
                title: t('table.inviter'),
                dataIndex: 'invite_user_name',
            },
            {
                title: t('table.roleName'),
                dataIndex: 'team_role_name',
            },
        ];


        return (
            <div>
                <Modal
                    width={'50%'}
                    open={visible}
                    title={t("label.teamMemberList")}
                    onCancel={() => setVisible(false)}>

                    <Input className={'header-modal-ipt'}/>
                    <Table columns={ columns} dataSource={data.members}></Table>
                </Modal>
            </div>
        )
    });