import {forwardRef, useImperativeHandle, useState} from "react";
import {Form, Input, message, Modal} from "antd";
import type {IEnv, IEnvSaveServer, IEnvService} from "@/types/envType.ts";
import {ServiceCreateEnvServer} from "@/api/env.ts";
import {useTranslation} from "react-i18next";

export interface ServerModalComponentRef {
    openForUpdate: (serverTail: IEnvService) => void;
    openForAdd: (env: IEnv) => void
    close: () => void;
}

interface ServerModalComponentProps {
    modal_type: string;
    onGetServer: () => void
}

export const ServerModalComponent = forwardRef<
    ServerModalComponentRef, ServerModalComponentProps>(
    ({modal_type, onGetServer}, ref) => {
        const {t} = useTranslation();
        const [messageApi, contextHolder] = message.useMessage();
        const [serverVisible, setServerVisible] = useState<boolean>(false)
        const [serverPayload, setServerPayload] = useState<IEnvSaveServer>({
            service_id: modal_type === 'update' ? 0 : undefined,
            team_id: '',
            env_id: 0,
            service_name: '',
            content: ''
        })
        const [form] = Form.useForm()

        useImperativeHandle(ref, () => ({
            openForUpdate: (serverTail: IEnvService) => {
                if (modal_type === 'update' && serverTail) {
                    setServerPayload({
                        ...serverPayload,
                        service_id: serverTail.service_id,
                        team_id: serverTail.team_id,
                        env_id: serverTail.env_id
                    })
                    form.setFieldsValue({
                        service_name: serverTail.service_name,
                        content: serverTail.content
                    })
                }
                setServerVisible(true)
            },
            openForAdd: (env: IEnv) => {
                if (modal_type === 'add' && env) {
                    setServerPayload({
                        ...serverPayload,
                        service_id: undefined,
                        team_id: env.team_id,
                        env_id: env.env_id
                    })
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
                    service_name: values.service_name,
                    content: values.content
                }
                ServiceCreateEnvServer(payload).then(res => {
                    if (res.em === "success") {
                        setServerVisible(false)
                    }
                    onGetServer()
                })
            } catch (e) {
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
                    <Form.Item name={"service_name"} label={t('env.serviceName')}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"content"} label={t('env.serviceAdder')}>
                        <Input/>
                    </Form.Item>
                </Form>

            </Modal>
        )
    })
