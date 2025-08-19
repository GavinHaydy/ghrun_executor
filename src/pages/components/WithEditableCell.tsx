import type {FormInstance} from "antd";
import {type CommonEditableCellProps, EditableCell} from "@/pages/components/EditableCell.tsx";
import React from "react";

// 高阶组件工厂：为不同表格创建专用的 EditableCell
export function withEditableCell<T extends object>(
    context: React.Context<FormInstance<T>>
) {
    return function EditableCellWrapper(
        props: Omit<CommonEditableCellProps<T>, "context">
    ) {
        return <EditableCell<T> {...props} context={context} />;
    };
}