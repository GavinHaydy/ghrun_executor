import React, {useEffect} from "react";
import {Col, Layout, Row} from "antd";
import "@/styles/index.less";
import {useCurrentTeamId} from "@/hooks/useSettings.ts";
import Cookies from "js-cookie";
import {ws} from "@/utils/webSocketClientSinglon.ts";
export const HomePage: React.FC = () => {
    const token = Cookies.get("token")
    const currentTeamId = useCurrentTeamId();
    const {Content} = Layout;


    // const wsRef = useRef<WebSocket | null>(null);

    const handleStartHeartbeat = () => {
        const params = {
            token: token,
            team_id: currentTeamId
        }

        const start_heartbeat = {
            route_url: "start_heartbeat",
            param: JSON.stringify(params)
        }
        ws.send(start_heartbeat)
    };
    const handleSendHomePage = () =>{
        const params = {
            token: token,
            team_id: currentTeamId
        }
        const homePage = {
            route_url: "home_page",
            param: JSON.stringify(params)
        }
        ws.throttledSend("test",homePage,1000)
    }
    useEffect(() => {
        ws.startHeartbeat(handleStartHeartbeat)

        const interval = setInterval(() => {
            handleSendHomePage();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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