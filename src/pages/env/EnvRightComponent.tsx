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

interface EnvRightComponentProps {
    env_tail: IEnv
}

export const EnvRightComponent:React.FC<EnvRightComponentProps> = ({env_tail}) =>{
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
            title: '服务名称',
            dataIndex: 'service_name',
        },
        {
            title: '服务地址',
            dataIndex: 'content',
        },
        {
            title: '操作',
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
            dataIndex: 'operation'
        }
    ]


    const items:TabsProps['items'] = [
        {
            key:'1',
            label: '服务',
            children: (<div>
                <Button style={{float: "left"}} onClick={() => {
                    setServerType('add')
                    modalServerRef.current?.openForAdd(env_tail)
                }}>添加服务</Button>
                <Table columns={ columns} dataSource={serverData.service_list}></Table>
            </div>)
        },
        {
            key:'2',
            label: '数据库',
            children:(
                <div>
                    <Button style={{float: "left"}}>添加数据库</Button>
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
            <div>环境名称{env_tail.env_name}</div>
            <Tabs items={ items} onChange={handleSwitchTab}></Tabs>

            <ServerModalComponent  ref={modalServerRef}
                                   // ent_tail={env_tail}
                                   modal_type={serverType}
                                   // serverTail={currentServer}
                                   onGetServer={handleGetServerList}/>
        </div>
    )
}