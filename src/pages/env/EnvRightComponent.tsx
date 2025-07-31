import type {IEnv, IEvnServiceList} from "@/types/envType.ts";
import React from "react";
import {Table} from "antd";

interface EnvRightComponentProps {
    env_tail: IEnv
    serverData: IEvnServiceList
}

export const EnvRightComponent:React.FC<EnvRightComponentProps> = ({env_tail,serverData}) =>{

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


    return (
        <div>
            <div>环境名称{env_tail.env_name}</div>
            <Table columns={ columns} dataSource={serverData.service_list}></Table>
        </div>
    )
}