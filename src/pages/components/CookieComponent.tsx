import React, {useEffect, useState} from 'react';
import {Table, Form, Switch, type FormInstance} from 'antd';
import type { ICookie } from '@/types/targets/cookieType.ts';
import {DeleteOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {createHandleSave} from "@/pages/components/SaveComponent.ts";
import {withEditableCell} from "@/pages/components/WithEditableCell.tsx";

const EditableContext = React.createContext<FormInstance<ICookie>>({} as FormInstance);

interface EditableRowProps {
    index: number;
}

interface CookieComponentProps{
    onChange:(data: ICookie[]) => void
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} className={index % 2 === 0 ? 'even-row' : 'odd-row'} />
            </EditableContext.Provider>
        </Form>
    );
};

// interface EditableCellProps {
//     // title: React.ReactNode;
//     editable: boolean;
//     dataIndex: keyof ICookie;
//     record: ICookie;
//     handleSave: (record: ICookie) => void;
//     placeholder?: string;
// }
//
// const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
//                                                                                 // title,
//                                                                                 editable,
//                                                                                 children,
//                                                                                 dataIndex,
//                                                                                 record,
//                                                                                 handleSave,
//                                                                                 placeholder,
//                                                                                 ...restProps
//                                                                             }) => {
//     const [editing, setEditing] = useState(false);
//     const inputRef = useRef<InputRef>(null);
//     const form = useContext(EditableContext)!;
//
//     useEffect(() => {
//         if (editing) {
//             inputRef.current?.focus();
//         }
//     }, [editing]);
//
//     const toggleEdit = () => {
//         setEditing(!editing);
//         form.setFieldsValue({ [dataIndex]: record[dataIndex] });
//     };
//
//     const save = async () => {
//         try {
//             const values = await form.validateFields();
//             setEditing(false);
//             handleSave({ ...record, ...values });
//
//         } catch (errInfo) {
//             console.log('Save failed:', errInfo);
//         }
//     };
//
//     let childNode = children;
//
//     if (editable) {
//         childNode = editing ? (
//             <Form.Item
//                 style={{ margin: 0 }}
//                 name={dataIndex}
//                 // rules={[{ required: true, message: `${title} is required.` }]}
//             >
//                 <Input ref={inputRef} placeholder={placeholder} onPressEnter={save} onBlur={save} />
//             </Form.Item>
//         ) : (
//             <div
//                 className="editable-cell-value-wrap"
//                 style={{ paddingInlineEnd: 24, minHeight: 24 }}
//                 onClick={toggleEdit}
//             >
//                 {record[dataIndex]}
//             </div>
//         );
//     }
//
//     return <td {...restProps}>{childNode}</td>;
// };
const EditableCell = withEditableCell<ICookie>(EditableContext)

export const CookieComponent: React.FC<CookieComponentProps> = ({onChange}) => {
    const {t} = useTranslation()
    const [dataSource, setDataSource] = useState<ICookie[]>([
        {
            id: '1',
            key: '',
            value: '',
            description: '',
            field_type: 'String',
            fileBase64: null,
            is_checked: 1,
            not_null: 1,
            type: 'Text',
        },
    ]);

    useEffect(() => {
        onChange(dataSource.slice(0,-1))
    }, [dataSource]);
    const handleDelete = (id: string) => {
        setDataSource(prev => prev.filter(item => item.id !== id));
    };

    // const handleAdd = () => {
    //     const maxId = Math.max(...dataSource.map(item => Number(item.id)), 0);
    //     setDataSource(prev => [
    //         ...prev,
    //         {
    //             id: String(maxId + 1),
    //             key: '',
    //             value: '',
    //             description: '',
    //             field_type: 'String',
    //             fileBase64: null,
    //             is_checked: 1,
    //             not_null: 1,
    //             type: 'Text',
    //         },
    //     ]);
    // };

    // const handleSave = (row: ICookie) => {
    //     setDataSource((prev) => {
    //         const newData = [...prev];
    //         const index = newData.findIndex((item) => item.id === row.id);
    //
    //         if (index === -1) return newData;
    //
    //         const updatedRow = { ...newData[index], ...row };
    //         newData[index] = updatedRow;
    //
    //         const isLastRow = index === newData.length - 1;
    //         const isEmpty = (!updatedRow.key || updatedRow.key.trim() === '') &&
    //             (!updatedRow.value || updatedRow.value.trim() === '');
    //
    //         // 逻辑 1：最后一行不为空 → 新增行
    //         if (isLastRow && !isEmpty) {
    //             const maxId = Math.max(...newData.map(item => Number(item.id)), 0);
    //             newData.push({
    //                 description: '',
    //                 field_type: 'String',
    //                 fileBase64: null,
    //                 id: String(maxId + 1),
    //                 is_checked: 1,
    //                 key: '',
    //                 not_null: 1,
    //                 type: 'Text',
    //                 value: ''
    //             });
    //         }
    //
    //         // 逻辑 2：非最后一行为空 → 删除行
    //         if (!isLastRow && isEmpty) {
    //             newData.splice(index, 1);
    //         }
    //         console.log(newData.slice(0,-1))
    //         return newData;
    //     });
    // };
    const handleSave = createHandleSave<ICookie>(
        setDataSource,
        (id) => ({
            description: '',
            field_type: 'String',
            fileBase64: null,
            id,
            is_checked: 1,
            key: '',
            not_null: 1,
            type: 'Text',
            value: ''
        })
    )

    const columns = [
        {
            title: t('enable'),
            dataIndex: 'is_checked',
            width: '1%',
            render: (_: unknown, record: ICookie) => (
                <Switch
                    checked={record.is_checked === 1}
                    onChange={checked => handleSave({ ...record, is_checked: checked ? 1 : 2 })}
                />
            ),
        },
        {
            title: t('subject.cookieKey'),
            dataIndex: 'key',
            editable: true,
        },
        {
            title: t('subject.cookieValue'),
            dataIndex: 'value',
            editable: true,
        },
        {
            // title: t('operation'),
            dataIndex: 'operation',
            width: '1%',
            render: (_: unknown, record: ICookie, index: number) => {
                const isLastRow = index === dataSource.length - 1; // 判断是否最后一行

                return(
                    <DeleteOutlined onClick={() => {
                        if (!isLastRow){
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
            onCell: (record: ICookie) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex as keyof ICookie,
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
