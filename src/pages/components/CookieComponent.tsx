// import React, { useState, useEffect } from 'react';
// import { Table, Input, Checkbox, Button } from 'antd';
// import { DeleteOutlined } from '@ant-design/icons';
// import type { ColumnsType } from 'antd/es/table';
// import type {ICookie} from "@/types/targets/cookieType.ts";
//
// interface EditableCellProps {
//     value: string | boolean;
//     onChange: (value: string | boolean) => void;
//     type: 'key' | 'value' | 'is_check';
// }
//
// const EditableCell: React.FC<EditableCellProps> = ({ value, onChange, type }) => {
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> |
//         React.MouseEvent<HTMLInputElement> |
//         { target: { checked: boolean } }) => {
//         if (type === 'is_check') {
//             onChange((e as { target: { checked: boolean } }).target.checked);
//         } else {
//             onChange((e as React.ChangeEvent<HTMLInputElement>).target.value);
//         }
//     };
//
//     if (type === 'is_check') {
//         return <Checkbox checked={value as boolean} onChange={handleChange} />;
//     }
//
//     return <Input value={value as string} onChange={handleChange} />;
// };
//
// export const CookieComponent: React.FC = () => {
//     const [dataSource, setDataSource] = useState<ICookie[]>([
//         {
//             description: '',
//             field_type: '',
//             is_checked: 0,
//             key: '',
//             not_null: 0,
//             type: '',
//             value: '',
//         }
//     ]);
//
//     useEffect(() => {
//         // 检查是否需要添加新行
//         const shouldAddRow = dataSource.some(
//             (item, index) =>
//                 (item.key !== '' || item.value !== '') &&
//                 (index === dataSource.length - 1) &&
//                 (dataSource[dataSource.length - 1].key !== '' || dataSource[dataSource.length - 1].value !== '')
//         );
//
//         if (shouldAddRow) {
//             setDataSource(prev => [
//                 ...prev,
//                 {
//                     description: '',
//                     field_type: '',
//                     is_checked: 0,
//                     key: '',
//                     not_null: 0,
//                     type: '',
//                     value: '',
//                 }
//             ]);
//         }
//     }, [dataSource]);
//
//     const handleFieldChange = (index: number, field: keyof ICookie, value: string | number) => {
//         const newData = [...dataSource];
//         if (field === 'is_checked'){
//             newData[index][field] = value as number;
//         }else if (field === 'key' || field === 'value'){
//             newData[index][field] = value as  string;
//         }else {
//             console.log('field:', field)
//         }
//         setDataSource(newData);
//     };
//
//     const handleDelete = (index: number) => {
//         // 只有当 key 或 value 不为空时才能删除
//         if (dataSource[index].key !== '' || dataSource[index].value !== '') {
//             const newData = dataSource.filter((_, i) => i !== index);
//             setDataSource(newData);
//         }
//     };
//
//     const columns: ColumnsType<ICookie> = [
//         {
//             title: 'Is Check',
//             dataIndex: 'is_checked',
//             width: '20%',
//             render: (_: unknown, __: ICookie, index: number) => (
//                 <EditableCell
//                     value={dataSource[index].is_checked === 1}
//                     onChange={(value) => handleFieldChange(index, 'is_checked', value ? 1 : 0)}
//                     type="is_check"
//                 />
//             ),
//         },
//         {
//             title: 'Key',
//             dataIndex: 'key',
//             width: '30%',
//             render: (_: unknown, __: ICookie, index: number) => (
//                 <EditableCell
//                     value={dataSource[index].key}
//                     onChange={(value) => handleFieldChange(index, 'key', value as string)}
//                     type="key"
//                 />
//             ),
//         },
//         {
//             title: 'Value',
//             dataIndex: 'value',
//             width: '30%',
//             render: (_: unknown, __: ICookie, index: number) => (
//                 <EditableCell
//                     value={dataSource[index].value}
//                     onChange={(value) => handleFieldChange(index, 'value', value as string)}
//                     type="value"
//                 />
//             ),
//         },
//         {
//             title: 'Action',
//             dataIndex: 'action',
//             width: '20%',
//             render: (_: unknown, record: ICookie, index: number) => (
//                 <Button
//                     type="link"
//                     icon={<DeleteOutlined />}
//                     onClick={() => handleDelete(index)}
//                     disabled={record.key === '' && record.value === ''}
//                 />
//             ),
//         },
//     ];
//
//     return (
//         <Table
//             dataSource={dataSource}
//             columns={columns}
//             pagination={false}
//             rowKey={(_, index) => index?.toString() || '0'}
//         />
//     );
// };
//
import React, {useState } from 'react';
import { Table, Input, Switch, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface RowData {
    key: string;
    enabled: boolean;
    name: string;
    value: string;
}

export const CookieComponent: React.FC = () => {
    const [data, setData] = useState<RowData[]>([
        { key: '1', enabled: true, name: '', value: '' },
    ]);

    // 判断是否最后一行为空，如果不是就加一行
    const checkAndAddEmptyRow = (rows: RowData[]) => {
        const last = rows[rows.length - 1];
        if (last.name || last.value) {
            const newRow: RowData = {
                key: Date.now().toString(),
                enabled: true,
                name: '',
                value: '',
            };
            return [...rows, newRow];
        }
        return rows;
    };

    const handleChange = (
        key: string,
        field: keyof Omit<RowData, 'key'>,
        value: string | boolean
    ) => {
        const newData = data.map(row =>
            row.key === key ? { ...row, [field]: value } : row
        );
        setData(checkAndAddEmptyRow(newData));
        console.log('data:', data);
    };

    const handleDelete = (key: string) => {
        const row = data.find(d => d.key === key);
        // 如果是空行，不允许删除
        if (!row?.name && !row?.value) return;

        const newData = data.filter(d => d.key !== key);
        setData(newData);
    };

    const columns = [
        {
            title: '',
            dataIndex: 'enabled',
            width: 50,
            render: (_: unknown, record: RowData) => (
                <Switch
                    checked={record.enabled}
                    onChange={value => handleChange(record.key, 'enabled', value)}
                />
            ),
        },
        {
            title: 'cookie名',
            dataIndex: 'name',
            render: (_: unknown, record: RowData) => (
                <Input
                    value={record.name}
                    placeholder="参数名"
                    onChange={e => handleChange(record.key, 'name', e.target.value)}
                />
            ),
        },
        {
            title: 'cookie值',
            dataIndex: 'value',
            render: (_: unknown, record: RowData) => (
                <Input
                    style={{border: 'none'}}
                    value={record.value}
                    placeholder="参数值"
                    onChange={e => handleChange(record.key, 'value', e.target.value)}
                />
            ),
        },
        {
            title: '',
            dataIndex: 'actions',
            width: 50,
            render: (_: unknown, record: RowData) => {
                const isEmpty = !record.name && !record.value;
                return (
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        disabled={isEmpty}
                        onClick={() => handleDelete(record.key)}
                    />
                );
            },
        },
    ];

    return (
        <Table<RowData>
            rowKey="key"
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            size="small"
            style={{ background: '#0e0e25', color: '#fff' }}
        />
    );
};

// export default EditableRowTable;
