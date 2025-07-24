// AddMemberModal.tsx
import React, {
    forwardRef,
    useEffect, useImperativeHandle,
    useState,
} from 'react';
import {
    Modal,
    Input,
    Table,
    message, type TableProps, Select, Pagination,
} from 'antd';


import {useTranslation} from 'react-i18next';

import {getTeamCompanyMember, getUserInfo, ServiceInviteMember} from "@/api/header.ts";
import {useSelector} from "react-redux";
import type {RootState} from "@/store";
import type {
    IInviteMember,
    IInviteMemberList, ILabelAndValue,
    ISearch,
    ITeamCompanyMemberList,
    ITeamCompanyUserInfo
} from "@/types/commonType.ts";
import type {IRoleList} from "@/types/roleType.ts";

export interface InviteMemberModalRef {
    openModal: () => void;
}

type InviteMemberModalProps = {
    onAddSuccess?: () => void;
};

export const InviteMemberModal = forwardRef<InviteMemberModalRef, InviteMemberModalProps>((props, ref) => {
    const {onAddSuccess} = props
    const teamId = useSelector((state: RootState) => state.setting.settings.current_team_id);
    const [visible, setVisible] = useState(false);

    const {t} = useTranslation();
    const [messageApi, contextHolder] = message.useMessage();

    const [roleList, setRoleList] = useState<IRoleList>({
        role: {
            is_default: 0,
            level: 0,
            name: '',
            role_id: '',
            role_type: 0
        }, usable_roles: []
    })
    const [options, setOptions] = useState<ILabelAndValue[]>([]);
    const [searchMemberPayload, setMemberPayload] = useState<ISearch>({
        keyword: '',
        team_id: teamId,
        page: 1,
        size: 20,
    })
    const [memberData, setMemberData] = useState<ITeamCompanyMemberList>({
        create_user_id: '',
        members: [],
        total: 0,
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [inviteMemberPayload, setInviteMemberPayload] = useState<IInviteMemberList>({team_id: teamId, members: []})

    // 暴露 openModal 方法给父组件
    useImperativeHandle(ref, () => ({
        openModal: () => setVisible(true),
    }));

    const handleGetTeamCompanyMember = () => {
        getTeamCompanyMember(searchMemberPayload).then(r => {
            const temp: ITeamCompanyMemberList = {create_user_id: '', members: [], total: 0}
            if (r.code === 0 && r.data.members.length > 0) {
                r.data.members.map((item: ITeamCompanyUserInfo) => {
                    item.key = item.user_id
                })
                temp.create_user_id = r.data.create_user_id
                temp.members = r.data.members
                temp.total = r.data.total
            }
            setMemberData(temp)
        })
    }

    const handleGetUserInfo = () => {
        getUserInfo({team_id: teamId}).then(r => {
            if (r.code === 0 && r.data.usable_roles.length > 0) {
                setRoleList(r.data)
            } else {
                messageApi.error(r.et).then(() => {
                })
            }
            handleGetTeamCompanyMember()
        })
    }

    useEffect(() => {
        if (visible) {
            handleGetUserInfo()
        }
    }, [visible]);

    useEffect(() => {
        if (memberData.members.length > 0) {
            handleLoadDefaultCheckedKeys()
        }
    }, [memberData]);
    useEffect(() => {
        if (roleList.usable_roles.length > 0) {
            setOptions(roleList.usable_roles.map(item => {
                return {
                    label: item.name,
                    value: item.role_id
                }
            }))
        }
    }, [roleList]);


    useEffect(() => {
        handleGetTeamCompanyMember()
    }, [searchMemberPayload]);
    const handleRoleChange = (user_id: string, role_id: string) => {
        const exists = inviteMemberPayload.members.find(item => item.user_id === user_id)
        if (exists) {
            const update = inviteMemberPayload.members.map((item: IInviteMember) => {
                return item.user_id === user_id ? {...item, team_role_id: role_id} : item
            })
            setInviteMemberPayload({...inviteMemberPayload, members: update})
        } else {
            const member = memberData.members.find(item => item.user_id === user_id)
            if (member) {
                member.team_role_id = role_id
                member.team_role_name = roleList.usable_roles.find(item => item.role_id === role_id)?.name || ''
            }
        }
    }
    const columns = [
        {
            title: t('nickname'),
            dataIndex: 'nickname',
        },
        {
            title: t('companyRole'),
            dataIndex: 'company_role_name',
        },
        {
            title: t('teamRole'),
            dataIndex: 'team_role_id',
            render: (text: string, record: ITeamCompanyUserInfo) => (
                <>
                    {text ?
                        <p>{record.team_role_name}</p>
                        :
                        <Select
                            options={options}
                            defaultValue={record.team_role_id || options?.[0].value}
                            onChange={(value: string) => handleRoleChange(record.user_id, value)}
                        />
                    }
                </>
            )
        }
    ]

    const handleLoadDefaultCheckedKeys = () => {
        const temp = memberData.members
            .filter(item => item.team_role_id !== '')
            .map(item => item.key)
        setSelectedRowKeys(temp)
    }

    const rowSelection: TableProps<ITeamCompanyUserInfo>['rowSelection'] = {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: ITeamCompanyUserInfo[]) => {
            setSelectedRowKeys(selectedRowKeys)
            const temp: IInviteMember[] = selectedRows.map(item => ({
                user_id: item.user_id,
                team_role_id: item.team_role_id || options?.[0].value || ''
            }))
            setInviteMemberPayload({...inviteMemberPayload, members: temp})
            console.log(temp, '-----2')
            console.log(memberData.members, '-----2')

        },
        getCheckboxProps: (record: ITeamCompanyUserInfo) => ({
            disabled: !!record.team_role_id
        }),
    };

    const handleAdd = () => {
        console.log(inviteMemberPayload)
        ServiceInviteMember(inviteMemberPayload).then(r => {
            if (r.code === 0 && r.em === "success") {
                messageApi.success(t('message.addMemberSuccess')).then()
                setVisible(false)
                onAddSuccess?.()
            } else {
                messageApi.error(r.et).then()
            }
        })
    }
    return (
        <>
            {contextHolder}
            <Modal
                width="50%"
                title={t('label.addMemberWithinTheEnterprise')}
                open={visible}
                onCancel={() => setVisible(false)}
                onOk={handleAdd}
                okText={t('add')}
                cancelText={t('close')}
            >
                <Input
                    placeholder={t('placeholder.searchMember')}
                    value={searchMemberPayload.keyword}
                    onChange={(e) => {
                        setMemberPayload({...searchMemberPayload, keyword: e.target.value});
                        // loadTeamRoleAndMembers(teamId, e.target.value).then(r => r);
                    }}
                />
                {options.length > 0 &&
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={memberData?.members}
                    className={"table-scrollbar"}
                    scroll={{y: '50vh'}}
                    pagination={false}
                />}
                <Pagination
                    total={memberData.total}
                    showSizeChanger
                    showQuickJumper={true}
                    showTotal={(total) => {
                        console.log("------",total)
                        return t('label.total', {total})}
                    }
                    onChange={(page, pageSize) => {
                        setMemberPayload({...searchMemberPayload, page: page, size: pageSize});
                        // loadTeamRoleAndMembers(teamId, searchMemberPayload.keyword, page).then(r => r);
                    }}
                />
            </Modal>
        </>
    );
});
