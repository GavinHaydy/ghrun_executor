import React, {useEffect, useState} from "react";
import {CookieComponent} from "@/pages/components/CookieComponent.tsx";
import type {ICookie} from "@/types/targets/cookieType.ts";
import {Tabs, type TabsProps} from "antd";
import type {IHeader} from "@/types/targets/headersType.ts";
import {ReqHeaderComponent} from "@/pages/components/ReqHeaderComponent.tsx";
import {QueryComponent} from "@/pages/components/QueryComponent.tsx";
import type {IQuery} from "@/types/targets/queryType.ts";
import {BodyComponent} from "@/pages/components/BodyComponent.tsx";
import type {IBodyParameter} from "@/types/targets/bodyType.ts";
import {AssertComponent} from "@/pages/components/AssertComponent.tsx";
import type {IAssert} from "@/types/targets/assertType.ts";
import {AssociationExtractionComponent} from "@/pages/components/AssociationExtractionComponent.tsx";
import type {IAssociation} from "@/types/targets/associationType.ts";

export const SubjectRightComponent:React.FC = () =>{
    const [cookies, setCookies] = useState<ICookie[]>()
    const [headers, setHeaders] = useState<IHeader[]>()
    const [query,setQuery] = useState<IQuery[]>()
    const [body,setBody] = useState<IBodyParameter[]>()
    const [assert,setAssert] = useState<IAssert[]>()
    const [association,setAssociation] = useState<IAssociation[]>()
    useEffect(() => {
        console.log(cookies)
    }, [cookies]);
    useEffect(() => {
        console.log(headers)
    }, [headers]);
    useEffect(() => {
        console.log(query)
    }, [query]);
    useEffect(() => {
        console.log(body)
    }, [body])
    useEffect(() => {
        console.log(assert)
    }, [assert]);
    useEffect(() => {
        console.log(association)
    }, [association]);

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
            children: <QueryComponent onChange={setQuery}/>,
        },
        {
            label: 'Body',
            key: '4',
            children: <BodyComponent onChange={setBody}/>,
        },
        {
            label: 'Auth',
            key: '5',
            children: 'Content of Tab Pane 5',
        },
        {
            label: 'Assertion',
            key: '6',
            children: <AssertComponent onChange={setAssert}/>,
        },
        {
            label: 'AssociationExtraction',
            key: '7',
            children: <AssociationExtractionComponent onChange={setAssociation}/>,
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