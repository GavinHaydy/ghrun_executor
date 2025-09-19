import {Form, Input} from "antd";
import type {IPrivateKV} from "@/types/targets/authType.ts";
import React, {useEffect, useState} from "react";

export interface PrivateKVProps{
    onChange: (data: IPrivateKV) => void
}

export const PrivateKVPComponent:React.FC<PrivateKVProps> = ({onChange}) => {
    const [kv, setKv] = useState<IPrivateKV>({
        key: '',
        value: ''
    });
    const [form] = Form.useForm();

    const handleChange = async () => {
        const f = await form.validateFields()
        setKv(f)
    }

    useEffect(() => {
        onChange(kv)
    }, [kv]);

    return (
        <Form
            form={form}
            labelCol={{span:6}}
            onChange={handleChange}
            // wrapperCol={{span:16}}
        >
            <Form.Item
                label={"key"}
                name={'key'}

            >
                <Input placeholder={"key"} />
            </Form.Item>
            <Form.Item label={"value"} name={'value'}>
                <Input placeholder={"value"} />
            </Form.Item>
        </Form>
    )
}