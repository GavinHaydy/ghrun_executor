import {Dropdown, Input, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import type {ITargetList} from "@/types/targetType.ts";
import {IconFont} from "@/pages/components/IconFont.ts";
import './index.less'

interface SubjectLeftComponentProps {
    data: ITargetList
}

export const SubjectLeftComponent: React.FC<SubjectLeftComponentProps> = ({data}) => {
    const [listSearch, setListSearch] = useState<string>('')

    const createItems = [
        {key: '1', label: '新建Http接口'},
        {key: '2', label: '新建SQL'},
        {key: '3', label: '新建TCP'},
        {key: '4', label: '新建WebSocket'},
        {key: '5', label: '新建Dubbo'},
    ]


    return (
        <Space direction="vertical">
            <Input addonBefore={<SearchOutlined/>} onChange={(e) => {
                setListSearch(e.target.value)
            }}/>
            <div className={'subject-icon'}>
                <span className={'subject-icon-item'}>
                    <Dropdown menu={{items: createItems}}>
                        <IconFont type={'icon-connect'}/>
                    </Dropdown>
                    <span className={'subject-icon-line'}>|</span>
                </span>
                <span className={'subject-icon-item'}>
                    <IconFont type={'icon-add-folder'}/>
                    <span className={'subject-icon-line'}>|</span>
                </span>
                <span className={'subject-icon-item'}>
                    <IconFont type={'icon-download'}/>
                    <span className={'subject-icon-line'}>|</span>
                </span>
                <span className={'subject-icon-item'}>
                    <IconFont type={'icon-Expand'}/>
                </span>
            </div>

            {data && data.targets.map((item) => (
                <div>
                    {listSearch === '' ? item.name : item.name.includes(listSearch)}
                </div>
            ))}
        </Space>
    )
}