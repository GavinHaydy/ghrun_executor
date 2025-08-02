import {forwardRef, useImperativeHandle, useState} from "react";
import {Form, Input, message, Modal} from "antd";
import type {IEnv, IEnvService} from "@/types/envType.ts";
import {ServiceCreateEnvServer} from "@/api/env.ts";

export interface ServerModalComponentRef {
    open: (serverTail?: IEnvService) => void;
    close: () => void;
}

interface ServerModalComponentProps {
    ent_tail: IEnv;
    modal_type: string;
    onGetServer: () => void
}

export const ServerModalComponent = forwardRef<
    ServerModalComponentRef, ServerModalComponentProps>(
    ({ent_tail, modal_type,onGetServer}, ref) => {
        const [messageApi, contextHolder] = message.useMessage();
        const [serverVisible, setServerVisible] = useState<boolean>(false)
        const serverPayload= {
            service_id: modal_type === 'update' ? 0 : undefined,
            team_id: ent_tail.team_id,
            env_id: ent_tail.env_id,
            server_name: '',
            content: ''
        }
        const [form] = Form.useForm()

        useImperativeHandle(ref, () => ({
            open: (serverTail?: IEnvService) => {
                if (modal_type === 'update' && serverTail){
                    form.setFieldsValue({
                        server_name: serverTail.service_name,
                        content: serverTail.content
                    })
                }else {
                    form.resetFields()
                }
                setServerVisible(true)
            },
            close: () => {
                form.resetFields()
                setServerVisible(false)
            }
        }))

        const handleCancelServerModal = () => {
            form.resetFields()
            setServerVisible(false)
        }

        const handleSaveServer = async () => {
            try {
                const values = await form.validateFields();
                const payload = {
                    ...serverPayload,
                    server_name: values.server_name,
                    content: values.content
                }
                ServiceCreateEnvServer(payload).then(res => {
                    if (res.em === "success"){
                        setServerVisible(false)
                    }
                    onGetServer()
                })
            } catch (e){
                messageApi.error(`表单验证失败: ${e}`);
            }
        }

        return (
            <Modal title={modal_type === 'update' ? '修改服务' : '添加服务'} open={serverVisible}
                   onCancel={() => {
                       handleCancelServerModal()
                   }}
                   onOk={() => {
                       handleSaveServer().then()
                   }}
            >
                {contextHolder}
                <Form form={form}>
                    <Form.Item name={"server_name"} label={"服务名称"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"content"} label={"服务地址"}>
                        <Input/>
                    </Form.Item>
                </Form>

            </Modal>
        )
    })
