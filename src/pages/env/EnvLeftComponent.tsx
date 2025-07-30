import {Button, Input, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import type {IEnv} from "@/types/envType.ts";
import React, {useEffect, useState} from "react";

export interface EnvLeftComponentProps {
    data: IEnv[]
    onParamsChange: (params: { name: string}) => void;
}

export const EnvLeftComponent:React.FC<EnvLeftComponentProps> = ({data,onParamsChange}) => {
    const [keyword, setKeyword] = useState<string>('')

    useEffect(() => {
        if (keyword !== ''){
            onParamsChange?.({name:keyword});
        }
    }, [keyword]);
    return (
        <Space direction="vertical" style={{width: '80%',margin:'10px'}}>
            <Input addonBefore={<SearchOutlined />} onChange={(e)=> {setKeyword(e.target.value)}}/>
            <Button style={{width: '100%',backgroundColor:'transparent'}}>新建环境</Button>
            {data && data.map((item:IEnv) => (
                <div>{item.env_name}</div>
            ))}
        </Space>
    )
}