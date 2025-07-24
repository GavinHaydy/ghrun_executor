import {Avatar, Input, Modal, Pagination, Table} from "antd";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {useTranslation} from "react-i18next";
import type {ITeamMember, ITeamMemberList} from "@/types/teamType.ts";
import dayjs from "dayjs";
import {SearchOutlined} from "@ant-design/icons";

export interface TeamMemberModalRef {
    open: (teamId: string) => void
}

export interface TeamMemberModalProps {
    data: ITeamMemberList
    onParamsChange: (params: { keyword?: string; page?: number; size?: number }) => void;

}

export const TeamMemberComponent = forwardRef<TeamMemberModalRef,TeamMemberModalProps>(
    (props, ref) => {
        const {data,onParamsChange} = props
        const {t} = useTranslation()
        const [visible, setVisible] = useState<boolean>(false)

        const [keyword, setKeyword] = useState('');
        const [page, setPage] = useState(1);
        const [size, setSize] = useState(10);

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
                render: (_:unknown,record:ITeamMember ) => {
                    return (
                        <div className={'header-modal-member-img'}>
                            <Avatar src={record.avatar} alt=""/>
                            <div className={'header-modal-member-name'}>
                                <span>{record.nickname}</span>
                                <span>{record.account}</span>
                            </div>
                        </div>
                    )
                }
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

        useEffect(() => {
            onParamsChange?.({ keyword, page,size });
        }, [keyword,page,size]);
        return (
            <div>
                <Modal
                    width={'50%'}
                    open={visible}
                    title={t("label.teamMemberList")}
                    footer={null}
                    onCancel={() => setVisible(false)}>

                    <Input onChange={(e)=> {
                        setKeyword(e.target.value)
                        setPage(1)
                    }} addonBefore={<SearchOutlined />} className={'header-modal-ipt'} placeholder={t('placeholder.searchMember')}/>
                    <Table className={'header-modal-table'} columns={columns} dataSource={data.members} pagination={false}></Table>
                    <Pagination
                        align="center"
                        size="small"
                        total={data.total}
                        onChange={
                            (page,size)=>{
                                setPage(page)
                                setSize(size)
                            }
                        }
                        current={page}
                        showSizeChanger
                        showTotal={(total) => t('label.total', {total})}
                        showQuickJumper />
                </Modal>
            </div>
        )
    });