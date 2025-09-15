import {Button, Checkbox, Form, Input, Space} from "antd";
import {useState} from "react";
import type {IApiSetting} from "@/types/targets/apiSettingType.ts";

export const ApiSettingComponent = () => {
    const [form] = Form.useForm();
    const [settingValue, setSettingValue] = useState<IApiSetting>({
        client_name: '',
        is_redirects: 0,
        keep_alive: true,
        max_conn_per_host: 10000,
        max_conn_wait_timeout: 5,
        max_idle_conn_duration: 5,
        read_time_out: 0,
        redirects_num: 3,
        user_agent: true,
        write_time_out: 0
    })

    const onFinish = () => {
        console.log("提交的数据:", settingValue);
    };

    return (
        <Form
            layout={'inline'}
            form={form}
            labelAlign={"left"}
            style={{width:"40%"}}
            onFinish={onFinish}
            initialValues={settingValue}
            onValuesChange={(_, allValues) => {
                setSettingValue(allValues); // 表单值变更时，更新 React state
            }}
        >
            {/* 客户端名 + User-Agent + keep-alive 在同一行 */}
            <Form.Item label="客户端名">
                <Space>
                    {/* 输入框绑定 */}
                    <Form.Item name="client_name">
                        <Input placeholder="客户端名称" />
                    </Form.Item>

                    {/* Checkbox 绑定 userAgent */}
                    <Form.Item name="user_agent" valuePropName="checked">
                        <Checkbox>User-Agent</Checkbox>
                    </Form.Item>

                    {/* Checkbox 绑定 keepAlive */}
                    <Form.Item name="keep_alive" valuePropName="checked" noStyle>
                        <Checkbox>keep-alive (http长连接)</Checkbox>
                    </Form.Item>
                </Space>

            </Form.Item>

            <Form.Item label="最大空闲等待时间(秒)" name="max_idle_conn_duration">
                <Input min={0}/>
            </Form.Item>

            <Form.Item label="最大连接等待时间(秒)" name="max_conn_wait_timeout">
                <Input min={0}/>
            </Form.Item>

            <Form.Item label="最大连接数(个)" name="max_conn_per_host">
                <Input min={1}/>
            </Form.Item>

            <Form.Item>
                <Space>
                    <Form.Item name="is_redirects" valuePropName="checked">
                        <Checkbox onChange={e  => {
                            setSettingValue({...settingValue, is_redirects: e.target.checked ? 1 : 0})
                            // console.log(e.target.checked)
                        }}>跟随重定向:</Checkbox>
                    </Form.Item>
                        <Form.Item label={'重定向次:'} name={'redirects_num'}>
                            <Input disabled={!settingValue.is_redirects}/>
                        </Form.Item>
                </Space>
            </Form.Item>

            <Form.Item name={'read_time_out'}>
                <Space>
                    请求读取超时限制:
                    <Input/>
                    秒 (0代表无限制)
                </Space>

            </Form.Item>

            <Form.Item name={'write_time_out'}>
                <Space>
                    响应读取超时限制:
                    <Input/>
                    秒 (0代表无限制)
                </Space>
            </Form.Item>
            <Button onClick={onFinish}>cs</Button>
        </Form>
    );
}