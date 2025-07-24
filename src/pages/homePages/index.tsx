import React from "react";
import {Col, Layout, Row} from "antd";
import "@/styles/index.less";

export const HomePage: React.FC = () => {
    const {Content} = Layout;
    // return (
    //     <Layout className="layout">
    //         <Content style={{ padding: "12px 12px",height: "calc(100vh - 64px)"}}>
    //             <div style={{ display: "flex", flexDirection: "column",height: "100%"}}>
    //                 {/* 第一行：3列，每列占8份 */}
    //                 <div style={{ flex: 1 }}>
    //                     <Row gutter={16} style={{ height: "100%" }}>
    //                         <Col span={8}>
    //                             <div style={{ border: "1px solid #ccc", height: "100%" }}>1</div>
    //                         </Col>
    //                         <Col span={8}>
    //                             <div style={{ border: "1px solid #ccc", height: "100%" }}>2</div>
    //                         </Col>
    //                         <Col span={8}>
    //                             <div style={{ border: "1px solid #ccc", height: "100%" }}>3</div>
    //                         </Col>
    //                     </Row>
    //                 </div>
    //
    //                 {/* 第二行：2列，每列占12份 */}
    //                 <div style={{ flex: 1 ,marginTop: 24}}>
    //                     <Row gutter={16} style={{ height: "100%" }}>
    //                         <Col span={12}>
    //                             <div style={{ border: "1px solid #ccc", height: "100%" }}>A</div>
    //                         </Col>
    //                         <Col span={12}>
    //                             <div style={{ border: "1px solid #ccc", height: "100%" }}>B</div>
    //                         </Col>
    //                     </Row>
    //                 </div>
    //             </div>
    //         </Content>
    //     </Layout>
    // );
    return (
        <Layout className="layout">
            <Content className="layout-content">
                <div className="content-wrapper">
                    {/* 第一行 */}
                    <div className="row1">
                        <Row gutter={16}>
                            <Col span={8}>
                                <div>1</div>
                            </Col>
                            <Col span={8}>
                                <div>2</div>
                            </Col>
                            <Col span={8}>
                                <div>3</div>
                            </Col>
                        </Row>
                    </div>

                    {/* 第二行 */}
                    <div className="row2">
                        <Row gutter={16}>
                            <Col span={12}>
                                <div>A</div>
                            </Col>
                            <Col span={12}>
                                <div>B</div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Content>
        </Layout>
    );

}