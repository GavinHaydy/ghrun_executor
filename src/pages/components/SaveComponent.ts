import React from "react";

type BaseRow = {
    id?: string;
    key?: string;
    value?: string;
};

interface NewRowFactory<T extends BaseRow> {
    (id: string): T;
}

export function createHandleSave<T extends BaseRow>(
    setDataSource: React.Dispatch<React.SetStateAction<T[]>>,
    newRowFactory: NewRowFactory<T>,
    isEmptyRow?: (row: T) => boolean // 可选判空函数
) {
    return (row: T) => {
        setDataSource((prev) => {
            const newData = [...prev];
            const index = newData.findIndex((item) => item.id === row.id);

            if (index === -1) return newData;

            const updatedRow = { ...newData[index], ...row };
            newData[index] = updatedRow;

            const isLastRow = index === newData.length - 1;
            // const isEmpty =
            //     (!updatedRow.key || updatedRow.key.trim() === "") &&
            //     (!updatedRow.value || updatedRow.value.trim() === "");

            // 🔑 判空逻辑：优先用外部传的 isEmptyRow，否则就用默认的 key/value
            const isEmpty =
                isEmptyRow?.(updatedRow) ??
                (
                    ("key" in updatedRow && (!updatedRow.key || updatedRow.key.trim() === "")) &&
                    ("value" in updatedRow && (!updatedRow.value || updatedRow.value.trim() === ""))
                );

            // 逻辑 1：最后一行不为空 → 新增行
            if (isLastRow && !isEmpty) {
                const maxId = Math.max(...newData.map((item) => Number(item.id)), 0);
                newData.push(newRowFactory(String(maxId + 1)));
            }

            // 逻辑 2：非最后一行为空 → 删除行
            if (!isLastRow && isEmpty) {
                newData.splice(index, 1);
            }

            // console.log(newData.slice(0, -1));
            return newData;
        });
    };
}
