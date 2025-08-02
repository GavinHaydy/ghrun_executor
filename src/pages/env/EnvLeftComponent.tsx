import {Button, Input, message, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import type {IEnv} from "@/types/envType.ts";
import React, {useEffect, useState} from "react";
import {ServiceCreateEnv} from "@/api/env.ts";
import {useAuthInfo} from "@/hooks/useAuthInfo.ts";

export interface EnvLeftComponentProps {
    data: IEnv[]
    onParamsChange: (params: { name: string}) => void;
    envTail: (params:IEnv) => void;
}

export const EnvLeftComponent:React.FC<EnvLeftComponentProps> = ({data,onParamsChange,envTail}) => {
    const [keyword, setKeyword] = useState<string>('')
    const teamId = useAuthInfo().teamId
    const [messageApi, contextHolder] = message.useMessage();
    const [currentEnv, setCurrentEnv] = useState<IEnv>({env_id:0,env_name:'',team_id:''})

    useEffect(() => {
        if (keyword !== ''){
            onParamsChange?.({name:keyword});
        }
    }, [keyword]);
    const handleSwitchEnv = () => {
        envTail?.(currentEnv)
    }
    useEffect(() => {
        handleSwitchEnv()
    }, [currentEnv]);
    const handleCreateEnv = () => {
        ServiceCreateEnv({team_id:teamId}).then(res => {
            if (res.em === "success"){
                messageApi.success(`环境：${res.data.env_name} 创建成功`).then()
                onParamsChange?.({name:''});
            }
            else {
                messageApi.error(res.et).then()
            }
        })
    }
    return (
        <Space direction="vertical" style={{width: '80%',margin:'10px'}}>
            {contextHolder}
            <Input addonBefore={<SearchOutlined />} onChange={(e)=> {setKeyword(e.target.value)}}/>
            <Button
                style={{width: '100%',backgroundColor:'transparent'}}
                onClick={() => {handleCreateEnv()}}
            >新建环境</Button>
            {data && data.map((item:IEnv) => (
                <div key={item.env_id} onClick={() => {setCurrentEnv(item)}}>{item.env_name}</div>
            ))}
        </Space>
    )
}