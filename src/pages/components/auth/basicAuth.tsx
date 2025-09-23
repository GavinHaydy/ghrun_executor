import type {IBasic} from "@/types/targets/authType.ts";
import {useEffect, useState} from "react";
import {Form, Input} from "antd";

export interface BasicAuthProps{
    onChange: (data:IBasic) => void
}

export const BasicAuthComponent: React.FC<BasicAuthProps> = ({onChange}) => {

    const [basic, setBasic] = useState<IBasic>({
        username: '',
        password: ''
    });
    const [form] = Form.useForm();

    const handleChange = async() => {
        const f = await form.validateFields()
        setBasic(f)
    }

    useEffect(() => {
        onChange(basic)
    })


    return (
        <Form
            onChange={handleChange}
        >
            <Form.Item label={'username'} name={'username'}>
                <Input placeholder={'username'}/>
            </Form.Item>
            <Form.Item label={'password'} name={'password'}>
                <Input placeholder={'password'}/>
            </Form.Item>
        </Form>

    )
}