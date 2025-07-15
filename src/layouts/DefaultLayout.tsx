import React, { useState} from 'react';
import {Flex, Layout,} from 'antd';

const {Header, Sider, Content} = Layout;
// import {MenuLayout} from "@/layouts/SiderLayout.tsx";
import {Outlet} from "react-router-dom";
import {HeaderComponent} from "@/layouts/HeaderComponent.tsx";

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: '96vh'
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    flexBasis: '15%',
    lineHeight: '120px'
};


export const GlobalLayout: React.FC = () => {
        const [collapsed, setCollapsed] = useState(false);


        return (
            <Flex gap="middle" wrap>
                <Layout>
                    <Header style={{padding: '9px 10px 9px 10px'}}>
                        <HeaderComponent/>
                    </Header>
                    <Layout>
                        <Sider style={siderStyle} collapsible collapsed={collapsed}
                               onCollapse={(value) => setCollapsed(value)}>
                            {/*<MenuLayout/>*/}
                        </Sider>
                        <Content style={contentStyle}>
                            <Outlet/>
                        </Content>
                    </Layout>
                </Layout>
            </Flex>
        )
    }
;
