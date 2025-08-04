import type {
    IEnv,
    IEnvDB,
    IEnvDBList,
    IEnvService,
    IEnvServiceSearch,
    IEvnServiceList
} from "@/types/envType.ts";
import React, {useEffect, useRef, useState} from "react";
import {Button, Table, Tabs, type TabsProps} from "antd";
import {ServiceDeleteEnvServer, ServiceEnvDBList, ServiceEnvServerList} from "@/api/env.ts";
import {ServerModalComponent, type ServerModalComponentRef} from "@/pages/env/ServerModalComponent.tsx";
import {DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

interface EnvRightComponentProps {
    env_tail: IEnv
}

export const EnvRightComponent:React.FC<EnvRightComponentProps> = ({env_tail}) =>{
    const {t} = useTranslation()
    const [serverSearchPayload, setServerSearchPayload] = useState<IEnvServiceSearch>({team_id: env_tail.team_id, env_id: env_tail.env_id, page: 1, size: 10})
    const [serverData, setServerData] = useState<IEvnServiceList>({service_list: [], total: 0})
    const [dbData, setDbData] = useState<IEnvDBList>({database_list: [], total: 0})
    const [currentTab, setCurrentTab] = useState<string>('1')
    const [serverType, setServerType] = useState<string>('add')
    const modalServerRef = useRef<ServerModalComponentRef>(null)

    const handleDelServer = (record: IEnvService) =>{
        const payload = {env_id:record.env_id, service_id: record.service_id, team_id:record.team_id}
        ServiceDeleteEnvServer(payload).then(res => {
            if (res.em === "success"){
                handleGetServerList()
            }
        })
    }

    const columns = [
        {
            title: t('env.serviceName'),
            dataIndex: 'service_name',
        },
        {
            title: t('env.serviceAdder'),
            dataIndex: 'content',
        },
        {
            title: t('operation'),
            dataIndex: 'operation',
            render: (_: number,record: IEnvService) => (
                <>
                    <EyeOutlined onClick={() => {
                        // setCurrentServer(record)
                        setServerType('update')
                        modalServerRef.current?.openForUpdate(record)
                    }} />
                    <DeleteOutlined style={{marginLeft: '10px'}} onClick={()=>handleDelServer(record)}/>
                </>

            )
        }
    ]
    const db_columns = [
        {
            title: t('env.dbType'),
            dataIndex: 'type',
        },
        {
            title: t('name'),
            dataIndex: 'server_name',
        },
        {
            title: t('env.dbName'),
            dataIndex: 'db_name',
        },
        {
            title: t('env.host'),
            dataIndex: 'host',
        },
        {
            title: t('env.port'),
            dataIndex: 'port',
        },
        {
            title: t('operation'),
            dataIndex: 'operation'
        }
    ]


    const items:TabsProps['items'] = [
        {
            key:'1',
            label: t('env.server'),
            children: (<div>
                <Button style={{float: "left"}} onClick={() => {
                    setServerType('add')
                    modalServerRef.current?.openForAdd(env_tail)
                }}>{t('env.createServer')}</Button>
                <Table columns={ columns} dataSource={serverData.service_list}></Table>
            </div>)
        },
        {
            key:'2',
            label: t('env.db'),
            children:(
                <div>
                    <Button style={{float: "left"}}>{t('env.createDb')}</Button>
                    <Table columns={ db_columns} dataSource={dbData.database_list}></Table>
                </div>
            )
        }
    ]

    const handleGetServerList = () => {
        const tempList: IEvnServiceList = {service_list: [], total: 0}
        ServiceEnvServerList(serverSearchPayload).then(res => {
            if (res.em === "success"){
                tempList.service_list =res.data.service_list.map((item: IEnvService) => ({
                    ...item,
                    key: item.service_id
                }))
                tempList.total = res.data.total
            }
            setServerData(tempList)
        })
    }

    // 获取db
    const handleGetDBList = () => {
        const tempList: IEnvDBList = {database_list: [], total: 0}
        ServiceEnvDBList(serverSearchPayload).then(res => {
            if (res.em === "success"){
                res.data.database_list.map((item: IEnvDB) => ({
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
            <div>{t('env.envName', {name: env_tail.env_name})}</div>
            <Tabs items={ items} onChange={handleSwitchTab}></Tabs>

            <ServerModalComponent  ref={modalServerRef}
                                   modal_type={serverType}
                                   onGetServer={handleGetServerList}/>
        </div>
    )
}