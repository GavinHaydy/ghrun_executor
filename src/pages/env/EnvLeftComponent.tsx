import {Button, Dropdown, Input, type MenuProps, message, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import type {IEnv} from "@/types/envType.ts";
import React, {useEffect, useState} from "react";
import {ServiceCopyEnv, ServiceCreateEnv, ServiceDeleteEnv} from "@/api/env.ts";
import {useAuthInfo} from "@/hooks/useAuthInfo.ts";
import {IconFont} from "@/pages/components/IconFont.ts";

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


    const handleDelEnv = () =>{
        ServiceDeleteEnv({team_id:currentEnv.team_id,env_id:currentEnv.env_id}).then(res => {
            if (res.em === "success"){
                messageApi.success(`环境：${currentEnv.env_name} 删除成功`).then()
                onParamsChange?.({name:''});
            }
            else {
                messageApi.error(res.et).then()
            }
        })
    }

    const handleCloneEnv = () =>{
        ServiceCopyEnv({team_id:currentEnv.team_id,env_id:currentEnv.env_id}).then(res => {
            if (res.em === "success"){
                messageApi.success(`环境：${currentEnv.env_name} 克隆成功`).then()
                onParamsChange?.({name:''});
            }
            else {
                messageApi.error(res.et).then()
            }
        })
    }


    const items: MenuProps['items'] = [
        {
            label: '编辑环境',
            key: '1',
        },
        {
            label: '删除环境',
            key: '2',
            onClick: () => {
                handleDelEnv()
            },
        },
        {
            label: '克隆环境',
            key: '3',
            onClick: () => {
                handleCloneEnv()
            },
        }
    ]

    return (
        <Space direction="vertical" style={{width: '80%',margin:'10px'}}>
            {contextHolder}
            <Input addonBefore={<SearchOutlined />} onChange={(e)=> {setKeyword(e.target.value)}}/>
            <Button
                style={{width: '100%',backgroundColor:'transparent'}}
                onClick={() => {handleCreateEnv()}}
            >新建环境</Button>
            {data && data.map((item:IEnv) => (
                <div key={item.env_id} onClick={() => {setCurrentEnv(item)}}>
                    {item.env_name}
                    <Dropdown menu={{items}} trigger={['click']}>
                        <IconFont style={{marginLeft:'10px'}} type={"icon-more"}/>
                    </Dropdown>
                </div>
            ))}
        </Space>
    )
}