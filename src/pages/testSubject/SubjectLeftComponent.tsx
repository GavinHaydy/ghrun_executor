import {Dropdown, Input, Space, Splitter} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import type {ITargetList} from "@/types/targetType.ts";
import {IconFont} from "@/pages/components/IconFont.ts";
import './index.less'
// import {useUserInfo} from "@/hooks/useSettings.ts";
// import {generateUid} from "@/utils/uids.ts";
// import {useAuthInfo} from "@/hooks/useAuthInfo.ts";

interface SubjectLeftComponentProps {
    data: ITargetList
}

export const SubjectLeftComponent: React.FC<SubjectLeftComponentProps> = ({data}) => {
    const [listSearch, setListSearch] = useState<string>('')
    // const userInfo = useUserInfo()
    // const authInfo = useAuthInfo()

    const createItems = [
        {key: '1', label: '新建Http接口'},
        {key: '2', label: '新建SQL'},
        {key: '3', label: '新建TCP'},
        {key: '4', label: '新建WebSocket'},
        {key: '5', label: '新建Dubbo'},
    ]
    // const newApi = {
    //     created_user_id: userInfo.user_id,
    //     method: 'POST',
    //     name: "新建接口",
    //     parent_id: "0",
    //     recent_user_id: userInfo.user_id,
    //     sort: data.total + 1,
    //     source: 0,
    //     target_id: generateUid(),
    //     target_type: 'api',
    //     team_id: authInfo.teamId,
    //     type_sort: 0,
    //     url: "",
    //     version: 1
    // }


    return (
        <Space direction="vertical">
            <Input addonBefore={<SearchOutlined/>} onChange={(e) => {
                setListSearch(e.target.value)
            }}/>
            <Splitter>
                <Splitter.Panel defaultSize={'25%'} resizable={false}>
                    <Dropdown menu={{items: createItems}}>
                        <IconFont type={'icon-connect'}/>
                    </Dropdown>
                </Splitter.Panel>
                <Splitter.Panel defaultSize={'25%'} resizable={false}>
                    <IconFont type={'icon-add-folder'}/>
                </Splitter.Panel>
                <Splitter.Panel defaultSize={'25%'} resizable={false}>
                    <IconFont type={'icon-download'}/>
                </Splitter.Panel>
                <Splitter.Panel defaultSize={'25%'} resizable={false}>
                    <IconFont type={'icon-Expand'}/>
                </Splitter.Panel>
            </Splitter>

            {data && data.targets.map((item) => (
                <div>
                    {listSearch === '' ? item.name : item.name.includes(listSearch)}
                </div>
            ))}
        </Space>
    )
}