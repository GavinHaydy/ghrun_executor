import {forwardRef, useImperativeHandle, useState} from "react";
import type {IEnv, IEnvDB, IEnvSaveDB} from "@/types/envType.ts";
import {useTranslation} from "react-i18next";
import {Form, Input, InputNumber, message, Modal, Select} from "antd";
import {ServiceCreateDB} from "@/api/env.ts";


export interface DBModalComponentRef {
    openForUpdate: (dbTail: IEnvDB) => void;
    openForAdd: (env: IEnv) => void;
    close: () => void;
}

interface DBModalComponentProps {
    // modal_type: 'add' | 'update'
    onGetDB: () => void
}

export const DBModalComponent = forwardRef<
    DBModalComponentRef, DBModalComponentProps>(
    ({onGetDB}, ref) => {

        const {t} = useTranslation()
        const [messageApi, contextHolder] = message.useMessage()
        const [dbVisible, setDbVisible] = useState<boolean>(false)
        const [modal_type, setModalType] = useState<'add' | 'update'>('add')
        const [dbPayload, setDbPayload] = useState<IEnvSaveDB>({
            database_id: undefined,
            charset: '',
            db_name: '',
            env_id: 0,
            host: '',
            password: '',
            port: 0,
            server_name: '',
            team_id: '',
            type: '',
            user: ''
        })
        const [form] = Form.useForm()

        useImperativeHandle(ref, () => ({
            openForUpdate: (serverTail: IEnvDB) => {
                setModalType('update')
                setDbPayload({
                    ...dbPayload,
                    database_id: serverTail.database_id,
                    team_id: serverTail.team_id,
                    env_id: serverTail.env_id
                })
                form.setFieldsValue({
                    db_name: serverTail.db_name,
                    host: serverTail.host,
                    port: serverTail.port,
                    user: serverTail.user,
                    password: serverTail.password,
                    charset: serverTail.charset,
                    server_name: serverTail.server_name,
                    type: serverTail.type
                })
                setDbVisible(true)
            },
            openForAdd: (env: IEnv) => {
                setModalType('add')
                setDbPayload({
                    ...dbPayload,
                    database_id:undefined,
                    team_id: env.team_id,
                    env_id: env.env_id
                })
                setDbVisible(true)
            },
            close: () => {
                form.resetFields()
                setDbVisible(false)
            }
        }))

        const handleSaveDb = async () => {
            try {
                const values = await form.validateFields();
                const payload = {
                    ...dbPayload,
                    ...values
                }
                ServiceCreateDB(payload).then(res => {
                    if (res.em === "success"){
                        setDbVisible(false)
                    }
                    onGetDB()
                })
            } catch (e){
                messageApi.error(`表单验证失败: ${e}`);
            }
        }

        const dbOption = [
            {value: "pgsql", label: "PgSQL"},
            {value: "mysql", label: "MySQL"},
            {value: "oracle", label: "ORACLE"},
        ]

        const handleCancelDBModal = () => {
            form.resetFields()
            setDbVisible(false)
        }

        return (
            <Modal open={dbVisible}
                   title={modal_type === 'update' ? '修改服务' : '添加服务'}
                   onCancel={() => {handleCancelDBModal()}}
                    onOk={()=>handleSaveDb()}>
                {contextHolder}
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item label={t('env.dbType')} name={"type"}>
                        <Select options={dbOption}></Select>
                    </Form.Item>
                    <Form.Item label={t('name')} name={"server_name"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={t('env.dbName')} name={"db_name"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={t('env.host')} name={"host"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={t('env.port')} name={'port'}>
                        <InputNumber  min={1} max={65535} style={{ width: '100%' }}
                            controls={false}
                                      precision={0}
                        />
                    </Form.Item>
                    <Form.Item label={t('username')} name={"user"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={t('password')} name={"password"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={t('env.charset')} name={"charset"}>
                        <Input defaultValue="utf8mb4"/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    })