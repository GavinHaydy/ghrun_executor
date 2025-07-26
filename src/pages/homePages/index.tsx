import React, {useEffect, useState} from "react";
import "@/styles/index.less";
import {useCurrentTeamId} from "@/hooks/useSettings.ts";
import Cookies from "js-cookie";
import {ws} from "@/utils/webSocketClientSinglon.ts";
import {ApiCountComponent} from "@/pages/homePages/childComponents/ApiCountComponent.tsx";
import type {IWSHomeData} from "@/types/ws/homeType.ts";
import { CaseComponent } from "./childComponents/CaseComponent";
import {TeamOverviewComponent} from "@/pages/homePages/childComponents/TeamOverviewComponent.tsx";
import {AutoComponent} from "@/pages/homePages/childComponents/AutoComponent.tsx";
export const HomePage: React.FC = () => {
    const token = Cookies.get("token")
    const currentTeamId = useCurrentTeamId();

    const [wsData, setWsData] = useState<IWSHomeData>();

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
        ws.onMessage((data) => {
            if (data.code === 0 && data.route_url === 'home_page'){
                setWsData(data.data)
                // console.log(data.data.api_manage_data)
            }
        })
    }
    useEffect(() => {
        ws.startHeartbeat(handleStartHeartbeat)

        const interval = setInterval(() => {
            handleSendHomePage();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard-container">
            <div className="top-section">
                {wsData && <ApiCountComponent data={wsData}/>}
                {wsData && <CaseComponent data={wsData}/>}
                {wsData && <TeamOverviewComponent data={wsData}/>}
            </div>
            <div className="bottom-section">
                {wsData && <AutoComponent data={wsData}/>}
                <div>6666666</div>
            </div>
        </div>
    );

}