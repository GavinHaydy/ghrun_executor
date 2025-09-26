import {Button, Col, Divider, Input, Row, Select} from "antd";
import type {ITargetFolder} from "@/types/targetType.ts";
import React from "react";

interface SubjectHeaderProps {
    data: (data: ITargetFolder) => void
}


export const SubjectHeaderComponent: React.FC<SubjectHeaderProps> = ({data}) => {


    const methodList = ['post', 'get', 'put', 'patch', 'delete', 'copy', 'head', 'options', 'link', 'unlink', 'purge', 'lock', 'unlock', 'propfind', 'view'];
    const methodOpts = methodList.map(item => (
        {
            value: item.toUpperCase(),
            label: item.toUpperCase()
        }
    ))

    return (
        <>
            <Row style={{marginBottom: '4px'}}>
                <Col span={4}>
                    <Input size={'large'} value={data.name}/>
                </Col>
                <Col offset={16} span={2}>
                    <Select size={'large'} placeholder={'请选择环境'}></Select>
                </Col>
                <Col span={2}>
                    <Button size={'large'} type={"primary"} style={{width: '100%'}}>保存</Button>
                </Col>
            </Row>
            <Row style={{marginBottom: '4px'}}>
                <Col span={2}>
                    <Select style={{width:'100%'}} size={'large'} options={methodOpts} defaultValue={'POST'}></Select>
                </Col>
                <Col span={18}>
                    <Input size={'large'}/>
                </Col>
                <Col span={4}>
                    <Button size={'large'} type={'primary'} style={{width: '100%'}}>发送并保存</Button>
                </Col>
            </Row>
            <Divider size={'small'}/>
        </>
    )
}