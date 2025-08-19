// EditableCell.tsx
import React, { useContext, useEffect, useRef, useState } from "react";
import {Form, type FormInstance, Input} from "antd";
import type { InputRef } from "antd";

export interface CommonEditableCellProps<T> {
    editable: boolean;
    dataIndex: keyof T;
    record: T;
    handleSave: (record: T) => void;
    placeholder?: string;
    context: React.Context<FormInstance>; // Context 作为参数传入
}

export function EditableCell<T extends object>({
                                                   editable,
                                                   children,
                                                   dataIndex,
                                                   record,
                                                   handleSave,
                                                   placeholder,
                                                   context,
                                                   ...restProps
                                               }: React.PropsWithChildren<CommonEditableCellProps<T>>) {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(context)!;

    useEffect(() => {
        if (editing) inputRef.current?.focus();
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            setEditing(false);
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item style={{ margin: 0 }} name={dataIndex as string}>
                <Input
                    ref={inputRef}
                    placeholder={placeholder}
                    onPressEnter={save}
                    onBlur={save}
                />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingInlineEnd: 24, minHeight: 24 }}
                onClick={toggleEdit}
            >
                {record[dataIndex] as React.ReactNode}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
}

