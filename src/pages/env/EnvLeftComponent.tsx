import {Button, Dropdown, Input, type MenuProps, message, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import type {IEnv} from "@/types/envType.ts";
import React, {useEffect, useState} from "react";
import {ServiceCopyEnv, ServiceCreateEnv, ServiceDeleteEnv} from "@/api/env.ts";
import {useAuthInfo} from "@/hooks/useAuthInfo.ts";
import {IconFont} from "@/pages/components/IconFont.ts";
import {useTranslation} from "react-i18next";

export interface EnvLeftComponentProps {
    data: IEnv[]
    onParamsChange: (params: { name: string}) => void;
    envTail: (params:IEnv) => void;
}

export const EnvLeftComponent:React.FC<EnvLeftComponentProps> = ({data,onParamsChange,envTail}) => {
    const {t} = useTranslation()
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
            label: t('env.editEnv'),
            key: '1',
        },
        {
            label: t('env.delEnv'),
            key: '2',
            onClick: () => {
                handleDelEnv()
            },
        },
        {
            label: t('env.cloneEnv'),
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
            >{t('env.createEnv')}</Button>
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