import type {IEnv, IEnvDB, IEnvDBList, IEnvService, IEnvServiceSearch, IEvnServiceList} from "@/types/envType.ts";
import React, {useEffect, useState} from "react";
import {Table, Tabs, type TabsProps} from "antd";
import {ServiceEnvDBList, ServiceEnvServerList} from "@/api/env.ts";

interface EnvRightComponentProps {
    env_tail: IEnv
}

export const EnvRightComponent:React.FC<EnvRightComponentProps> = ({env_tail}) =>{
    const [serverSearchPayload, setServerSearchPayload] = useState<IEnvServiceSearch>({team_id: env_tail.team_id, env_id: 0, page: 1, size: 10})
    const [serverData, setServerData] = useState<IEvnServiceList>({service_list: [], total: 0})
    const [dbData, setDbData] = useState<IEnvDBList>({database_list: [], total: 0})
    const [currentTab, setCurrentTab] = useState<string>('1')

    const columns = [
        {
            title: '服务名称',
            dataIndex: 'service_name',
        },
        {
            title: '服务地址',
            dataIndex: 'content',
        }
    ]
    const db_columns = [
        {
            title: '数据库类型',
            dataIndex: 'type',
        },
        {
            title: '名称',
            dataIndex: 'server_name',
        },
        {
            title: '库名',
            dataIndex: 'db_name',
        },
        {
            title: 'IP地址',
            dataIndex: 'host',
        },
        {
            title: '端口',
            dataIndex: 'port',
        },
        {
            title: '操作',
            dataIndex: 'operation',
        }
    ]

    const items:TabsProps['items'] = [
        {
            key:'1',
            label: '服务',
            children:<Table columns={ columns} dataSource={serverData.service_list}></Table>
        },
        {
            key:'2',
            label: '数据库',
            children:<Table columns={ db_columns} dataSource={dbData.database_list}></Table>
        }
    ]

    const handleGetServerList = () => {
        const tempList: IEvnServiceList = {service_list: [], total: 0}
        ServiceEnvServerList(serverSearchPayload).then(res => {
            if (res.em === "success"){
                res.data.service_list.map((item: IEnvService) => ({
                    ...item,
                    key: item.service_id
                }))
            }
            setServerData(tempList)
        })
    }

    // 获取db
    const handleGetDBList = () => {
        const tempList: IEnvDBList = {database_list: [], total: 0}
        ServiceEnvDBList(serverSearchPayload).then(res => {
            if (res.em === "success"){
                res.data.service_list.map((item: IEnvDB) => ({
                    ...item,
                    key: item.database_id
                }))
            }
            setDbData(tempList)
        })
    }

    useEffect(() => {
        if (serverSearchPayload.env_id && currentTab === '1'){
            handleGetServerList()
        }
        if (serverSearchPayload.env_id && currentTab === '2'){
            handleGetDBList()
        }
    }, [serverSearchPayload]);

    useEffect(() => {
        setServerSearchPayload({...serverSearchPayload,team_id: env_tail.team_id, env_id: env_tail.env_id})
    }, [env_tail]);

    const handleSwitchTab = (key: string) => {
        setCurrentTab(key)
        if (key === '1'){
            handleGetServerList()
        }else {
            handleGetDBList()
        }
    }

    return (
        <div>
            <div>环境名称{env_tail.env_name}</div>
            <Tabs items={ items} onChange={handleSwitchTab}></Tabs>

        </div>
    )
}