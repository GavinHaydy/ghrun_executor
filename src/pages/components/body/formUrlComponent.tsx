import React, { useEffect, useState} from 'react';
import {Table, Form, Switch, type FormInstance} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {withEditableCell} from "@/pages/components/WithEditableCell.tsx";
import {createHandleSave} from "@/pages/components/SaveComponent.ts";
import type {IBodyParameter} from "@/types/targets/bodyType.ts";

const EditableContext = React.createContext<FormInstance<IBodyParameter>>({} as FormInstance);

interface EditableRowProps {
    index: number;
}

interface CookieComponentProps {
    onChange: (data: IBodyParameter[]) => void
}

const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} className={index % 2 === 0 ? 'even-row' : 'odd-row'}/>
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = withEditableCell<IBodyParameter>(EditableContext)

export const BodyFormUrlComponent: React.FC<CookieComponentProps> = ({onChange}) => {
    const {t} = useTranslation()
    const [dataSource, setDataSource] = useState<IBodyParameter[]>([
        {
            id: '1',
            key: '',
            value: '',
            description: '',
            field_type: 'String',
            is_checked: 1,
            not_null: 1,
            type: 'Text',
        },
    ]);

    useEffect(() => {
        onChange(dataSource.slice(0, -1))
    }, [dataSource]);
    const handleDelete = (id: string) => {
        setDataSource(prev => prev.filter(item => item.id !== id));
    };

    const handleSave = createHandleSave<IBodyParameter>(
        setDataSource,
        (id) => ({
            id,
            key: '',
            value: '',
            description: '',
            field_type: 'String',
            is_checked: 1,
            not_null: 1,
            type: 'Text',
        })
    )

    const columns = [
        {
            title: t('enable'),
            dataIndex: 'is_checked',
            width: '1%',
            render: (_: unknown, record: IBodyParameter) => (
                <Switch
                    checked={record.is_checked === 1}
                    onChange={checked => handleSave({...record, is_checked: checked ? 1 : 2})}
                />
            ),
        },
        {
            title: t('key'),
            dataIndex: 'key',
            editable: true,
        },
        {
            title: t('value'),
            dataIndex: 'value',
            editable: true,
        },
        {
            title: t('subject.description'),
            dataIndex: 'description',
            editable: true,
        },
        {
            // title: t('operation'),
            dataIndex: 'operation',
            width: '1%',
            render: (_: unknown, record: IBodyParameter, index: number) => {
                const isLastRow = index === dataSource.length - 1; // 判断是否最后一行

                return (
                    <DeleteOutlined onClick={() => {
                        if (!isLastRow) {
                            handleDelete(record.id)
                        }
                    }}>
                    </DeleteOutlined>
                )
            },
        },
    ];


    const mergedColumns = columns.map(col => {
        if (!col.editable) return col;
        return {
            ...col,
            onCell: (record: IBodyParameter) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex as keyof IBodyParameter,
                title: col.title,
                handleSave,
                placeholder: col.dataIndex === 'key' ? '请输入 cookieKey' : '请输入 cookieVal',
            }),
        };
    });

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    return (
        <Table
            size="small"
            components={components}
            bordered
            dataSource={dataSource}
            columns={mergedColumns}
            rowKey="id"
            pagination={false}
        />
    );
};
