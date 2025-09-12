import React, { useEffect, useState} from 'react';
import {Table, Form, Switch, type FormInstance, Select} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {withEditableCell} from "@/pages/components/WithEditableCell.tsx";
import {createHandleSave} from "@/pages/components/SaveComponent.ts";
import type {IAssociation} from "@/types/targets/associationType.ts";

const EditableContext = React.createContext<FormInstance<IAssociation>>({} as FormInstance);

interface EditableRowProps {
    index: number;
}

interface CookieComponentProps {
    onChange: (data: IAssociation[]) => void
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

const EditableCell = withEditableCell<IAssociation>(EditableContext)

export const AssociationExtractionComponent: React.FC<CookieComponentProps> = ({onChange}) => {
    const {t} = useTranslation()
    const [dataSource, setDataSource] = useState<IAssociation[]>([
        {
            express: "",
            id:"0",
            index: 0,
            is_checked: 1,
            type: 0,
            val: "",
            var: ""
        },
    ]);

    useEffect(() => {
        onChange(dataSource.slice(0, -1))
    }, [dataSource]);
    const handleDelete = (id: string) => {
        setDataSource(prev => prev.filter(item => item.id !== id));
    };

    const associationType = [
        {value: 0, label: t('subject.regular')},
        {value: 1, label: t('subject.json')},
        {value: 2, label: t('subject.resHeader')},
        {value: 3, label: t('subject.resCode')},
    ]

    const handleSave = createHandleSave<IAssociation>(
        setDataSource,
        (id) => ({
            express: "",
            id,
            is_checked: 1,
            type: 0,
            val: "",
            var: ""
        }),
        (row) => !row.var.trim() && !row.express.trim() && !row.val,
    )

    const columns = [
        {
            title: t('enable'),
            dataIndex: 'is_checked',
            width: '1%',
            render: (_: unknown, record: IAssociation) => (
                <Switch
                    checked={record.is_checked === 1}
                    onChange={checked => handleSave({...record, is_checked: checked ? 1 : 2})}
                />
            ),
        },
        {
            title: t('type'),
            dataIndex: 'type',
            width: '1%',
            render: (_: unknown,record:IAssociation) => (
                <Select options={associationType} placeholder={t('placeholder.select')}
                        onChange={(value) => {
                            handleSave({ ...record, type: value }); // 🔑 回填到 dataSource
                        }}
                ></Select>
            )
        },
        {
            title: t('var'), // 字段
            dataIndex: 'var',
            editable: true,
        },
        {
            title: t('expression'),
            dataIndex: 'express',
            editable: true
        },
        {
            title: t('description'),
            dataIndex: 'val',
            editable: true,
        },
        {
            // title: t('operation'),
            dataIndex: 'operation',
            width: '1%',
            render: (_: unknown, record: IAssociation, index: number) => {
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
            onCell: (record: IAssociation) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex as keyof IAssociation,
                title: col.title,
                handleSave,
                placeholder: col.dataIndex === 'key' ? '请输入 cookieKey' : '请输入 cookieVal',
                disableEdit: col.dataIndex === 'express' ? (r: IAssociation) => r.type === 3 : undefined
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
