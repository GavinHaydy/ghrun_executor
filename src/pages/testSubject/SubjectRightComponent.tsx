import React, {useEffect, useState} from "react";
import {CookieComponent} from "@/pages/components/CookieComponent.tsx";
import type {ICookie} from "@/types/targets/cookieType.ts";
import {Tabs, type TabsProps} from "antd";
import type {IHeader} from "@/types/targets/headersType.ts";
import {ReqHeaderComponent} from "@/pages/components/ReqHeaderComponent.tsx";

export const SubjectRightComponent:React.FC = () =>{
    const [cookies, setCookies] = useState<ICookie[]>()
    const [headers, setHeaders] = useState<IHeader[]>()
    useEffect(() => {
        console.log(cookies)
    }, [cookies]);
    useEffect(() => {
        console.log(headers)
    }, [headers]);

    const items: TabsProps['items'] = [
        {
            label: 'Cookie',
            key: '1',
            children: <CookieComponent onChange={setCookies}/>,
        },
        {
            label: 'Header',
            key: '2',
            children: <ReqHeaderComponent onChange={setHeaders}/>,
        },
        {
            label: 'Query',
            key: '3',
            children: 'Content of Tab Pane 3',
        },
        {
            label: 'Body',
            key: '4',
            children: 'Content of Tab Pane 4',
        },
        {
            label: 'Auth',
            key: '5',
            children: 'Content of Tab Pane 5',
        },
        {
            label: 'Assertion',
            key: '6',
            children: 'Content of Tab Pane 6',
        },
        {
            label: 'AssociationExtraction',
            key: '7',
            children: 'Content of Tab Pane 7',
        },
        {
            label: 'APISettings',
            key: '8',
            children: 'Content of Tab Pane 8',
        },
    ]
    return (
        <div>
            {/*<CookieComponent onChange={setCookies}/>*/}
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}