import {Button, Col, Input, Row, Select} from "antd";

export const SubjectHeaderComponent = () => {
    return (
        <>
            <Row>
               <Col span={4}>
                   <Input/>
               </Col>
                <Col offset={16} span={2}>
                    <Select placeholder={'请选择环境'}></Select>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} style={{width:'100%'}}>保存</Button>
                </Col>
            </Row>
            <Row>
                <Col span={20}>
                    <Input/>
                </Col>
                <Col span={4}>
                    <Button type={'primary'} style={{width:'100%'}}>发送并保存</Button>
                </Col>
            </Row>
        </>
    )
}