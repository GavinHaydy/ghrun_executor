import type {IDigest} from "@/types/targets/authType.ts";
import React, {useEffect, useState} from "react";
import {Form, Input, Select} from "antd";

export interface DigestAuthProps {
    onChange: (data: IDigest) => void
}

export const DigestAuthComponent: React.FC<DigestAuthProps> = ({onChange}) => {
    const [digest, setDigest] = useState<IDigest>({
        algorithm: '',
        cnonce: '',
        nc: '',
        nonce: '',
        opaque: '',
        password: '',
        qop: '',
        realm: '',
        username: ''
    })

    const opts = [
        {label: 'MD5', value: 'MD5'},
        {label: 'MD5-sess', value: 'MD5-sess'},
        {label: 'SHA-256', value: 'SHA-256'},
        {label: 'SHA-256-sess', value: 'SHA-256-sess'},
        {label: 'SHA-512-256', value: 'SHA-512-256'},
        {label: 'SHA-512-256-sess', value: 'SHA-512-256-sess'}

    ]

    const [form] = Form.useForm()

    const handleChange = async () => {
        const f = await form.validateFields()
        setDigest(f)
    }

    useEffect(() => {
        onChange(digest);
    },[digest])

    return (
        <Form
            form={form}
            onChange={handleChange}
        >
            <Form.Item label={'username'} name={'username'}>
                <Input placeholder={'username'}/>
            </Form.Item>
            <Form.Item label={'password'} name={'password'}>
                <Input placeholder={'password'}/>
            </Form.Item>
            <Form.Item label={'realm'} name={'realm'}>
                <Input placeholder={'realm'}/>
            </Form.Item>
            <Form.Item label={'nonce'} name={'nonce'}>
                <Input placeholder={'nonce'}/>
            </Form.Item>
            <Form.Item label={'algorithm'} name={'algorithm'}>
                <Select options={opts}></Select>
            </Form.Item>
            <Form.Item label={'qop'} name={'qop'}>
                <Input placeholder={'e.g. auth-int'}/>
            </Form.Item>
            <Form.Item label={'nc'} name={'nc'}>
                <Input placeholder={'e.g. 000000001'}/>
            </Form.Item>
            <Form.Item label={'cnonce'} name={'cnonce'}>
                <Input placeholder={'e.g. 9acf8e7d'}/>
            </Form.Item>
            <Form.Item label={'opaque'} name={'opaque'}>
                <Input placeholder={'opaque'}/>
            </Form.Item>
        </Form>
    )
}