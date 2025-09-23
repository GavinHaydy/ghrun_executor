import {Input, Space} from "antd";
import React, {useEffect, useState} from "react";
import type {IBearer} from "@/types/targets/authType.ts";

export interface BearerProps{
    onChange: (data: IBearer) => void
}

export const BearerComponent:React.FC<BearerProps> = ({onChange}) => {
    const [val, setVal] = useState<IBearer>({key: ''});

    useEffect(() => {
        onChange(val)
    }, [val]);
    return (
        <>
            <Space>
                <div>token:</div>
                <Input
                    value={val.key}
                    onChange={(e) =>{setVal({key:e.target.value})}}
                />
            </Space>
        </>

    )
}