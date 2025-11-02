import React, {useEffect, useState} from "react";
import {CookieComponent} from "@/pages/components/CookieComponent.tsx";
import {Tabs, type TabsProps} from "antd";
import {ReqHeaderComponent} from "@/pages/components/ReqHeaderComponent.tsx";
import {QueryComponent} from "@/pages/components/QueryComponent.tsx";
import {BodyComponent} from "@/pages/components/BodyComponent.tsx";
import {AssertComponent} from "@/pages/components/AssertComponent.tsx";
import {AuthComponent} from "@/pages/components/AuthComponent.tsx";
import type {ITargetRequest, ITargetSave} from "@/types/targetType.ts";
import type {IDubboDetail} from "@/types/targets/dubboType.ts";
import type {IEnvInfo} from "@/types/envType.ts";
import type {IMqttDetail} from "@/types/targets/mqttType.ts";
import type {ISqlDetail} from "@/types/targets/sqlType.ts";
import type {ITcpDetail} from "@/types/targets/tcpType.ts";
import type {IWebsocketDetail} from "@/types/targets/wsType.ts";
import {generateUid} from "@/utils/uids.ts";
import {useAuthInfo} from "@/hooks/useAuthInfo.ts";
import {AssociationExtractionComponent} from "@/pages/components/AssociationExtractionComponent.tsx";
import {ApiSettingComponent} from "@/pages/components/ApiSettingComponent.tsx";

interface SubjectRightComponentProps {
    // data: ITargetList
    // onAdd: (item: ITargetFolder) => void;
    // onClick: (item: string) => void;
    onChange: (item: ITargetSave) => void
}

export const SubjectRightComponent:React.FC<SubjectRightComponentProps> = ({onChange}) =>{
    const teamID = useAuthInfo().teamId
    const [targetPayload, setTargetPayload] = useState<ITargetSave>({
        target_id: generateUid(),
        name: '新建接口',
        method: 'GET',
        url: '',
        version: 1,
        type_sort: 0,
        sort: 0,
        source: 0,
        team_id: teamID as string,
        parent_id: '0',
        old_target_id: '',
        old_parent_id: '',
        target_type: 'api',
        description: '',
        dubbo_detail: {} as IDubboDetail,
        env_info: {} as IEnvInfo,
        mqtt_detail: {} as IMqttDetail,
        request: {} as ITargetRequest,
        sql_detail: {} as ISqlDetail,
        tcp_detail: {} as ITcpDetail,
        websocket_detail: {} as IWebsocketDetail
    });

    // request 对应字段对象修改
    // updateRequestField(setTargetPayload, 'cookie', { key: 'auth', value: 'token123' });
    const updateRequestField = <K extends keyof ITargetRequest>(
        setter: React.Dispatch<React.SetStateAction<ITargetSave>>,
        key: K,
        value: ITargetRequest[K]
    ) =>{
        setter(prev => prev ? {
            ...prev,
            request: {
                ...prev.request,
                [key]: value
            }
        } : prev);
    }

    useEffect(() => {
        onChange(targetPayload)
        console.log(targetPayload)
    }, [targetPayload]);


    const items: TabsProps['items'] = [
        {
            label: 'Cookie',
            key: '1',
            children: <CookieComponent onChange={newCookie =>
                updateRequestField(setTargetPayload, 'cookie', newCookie)
            }/>,
        },
        {
            label: 'Header',
            key: '2',
            children: <ReqHeaderComponent onChange={newHeader =>
                updateRequestField(setTargetPayload, 'header', newHeader)
            }/>,
        },
        {
            label: 'Query',
            key: '3',
            children: <QueryComponent onChange={newQuery =>
                updateRequestField(setTargetPayload, 'query', newQuery)
            }/>,
        },
        {
            label: 'Body',
            key: '4',
            children: <BodyComponent onChange={newBody =>
                updateRequestField(setTargetPayload, 'body', newBody)
            }/>,
        },
        {
            label: 'Auth',
            key: '5',
            children: <AuthComponent/>,
        },
        {
            label: 'Assertion',
            key: '6',
            children: <AssertComponent onChange={newAssert =>
                updateRequestField(setTargetPayload, 'assert', newAssert)
            }/>,
        },
        {
            label: 'AssociationExtraction',
            key: '7',
            children: <AssociationExtractionComponent onChange={newAssociation =>
                updateRequestField(setTargetPayload, 'regex', newAssociation)
            }/>,
        },
        {
            label: 'APISettings',
            key: '8',
            children: <ApiSettingComponent onChange={newApiSettings =>
                updateRequestField(setTargetPayload, 'http_api_setup', newApiSettings)
            }/>,
        },
    ]
    return (
        <div>
            {/*<CookieComponent onChange={setCookies}/>*/}
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}