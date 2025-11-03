import {Dropdown, Input, Space, Splitter} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import type { ITargetList, ITargetRequest, ITargetSave} from "@/types/targetType.ts";
import {IconFont} from "@/pages/components/IconFont.ts";
import './index.less'
import {generateUid} from "@/utils/uids.ts";
import {useAuthInfo} from "@/hooks/useAuthInfo.ts";
import type {IDubboDetail} from "@/types/targets/dubboType.ts";
import type {IEnvInfo} from "@/types/envType.ts";
import type {IMqttDetail} from "@/types/targets/mqttType.ts";
import type {ISqlDetail} from "@/types/targets/sqlType.ts";
import type {ITcpDetail} from "@/types/targets/tcpType.ts";
import type {IWebsocketDetail} from "@/types/targets/wsType.ts";

interface SubjectLeftComponentProps {
    data: ITargetList
    onAdd: (item: ITargetSave) => void;
    onClick: (item: string) => void;
    // onSelect: (target_id: string) => void;
}

export const SubjectLeftComponent: React.FC<SubjectLeftComponentProps> = ({data,onAdd,onClick}) => {
    const [listSearch, setListSearch] = useState<string>('')
    // const userInfo = useUserInfo()
    const authInfo = useAuthInfo()

    const newApi = ():ITargetSave => {
        const key = generateUid()
        return {
            description: "",
            dubbo_detail: {} as IDubboDetail,
            env_info: {} as IEnvInfo,
            method: "post",
            mqtt_detail: {}as IMqttDetail,
            name: "new api",
            old_target_id: "",
            old_parent_id: "",
            parent_id: "0",
            request: {} as ITargetRequest,
            sort: data.total + 1,
            source: 0,
            // source_id?: string, //暂时用不上
            sql_detail: {} as ISqlDetail,
            target_id: key,
            target_type: "api",
            tcp_detail: {} as ITcpDetail,
            team_id: authInfo.teamId as string,
            type_sort: 0,
            url: "",
            version: 1,
            websocket_detail: {} as IWebsocketDetail,
        }
    }
    const handleCreateHttp = () => {
        onAdd(newApi())
    }

    const handleClick = (target_id: string) => {
        onClick(target_id)
    }


    const createItems = [
        {key: '1', label: (<div onClick={handleCreateHttp}>新建Http接口</div>)},
        {key: '2', label: '新建SQL'},
        {key: '3', label: '新建TCP'},
        {key: '4', label: '新建WebSocket'},
        {key: '5', label: '新建Dubbo'},
    ]



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
                <div key={item.target_id} onClick={()=>handleClick(item.target_id)}>
                    {listSearch === '' ? item.name : item.name.includes(listSearch)}
                </div>
            ))}
        </Space>
    )
}