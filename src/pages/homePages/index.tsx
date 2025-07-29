import React, {useEffect, useState} from "react";
import "@/styles/index.less";
import {useCurrentTeamId} from "@/hooks/useSettings.ts";
import Cookies from "js-cookie";
import {ApiCountComponent} from "@/pages/homePages/childComponents/ApiCountComponent.tsx";
import type {IWSHomeData} from "@/types/ws/homeType.ts";
import { CaseComponent } from "./childComponents/CaseComponent";
import {TeamOverviewComponent} from "@/pages/homePages/childComponents/TeamOverviewComponent.tsx";
import {AutoComponent} from "@/pages/homePages/childComponents/AutoComponent.tsx";
import type {IWSResponse} from "@/utils/wsClient.ts";
import {getWebSocket} from "@/utils/webSocketClientSinglon.ts";
export const HomePage: React.FC = () => {
    const ws = getWebSocket()
    const token = Cookies.get("token")
    const currentTeamId = useCurrentTeamId();

    const [wsData, setWsData] = useState<IWSHomeData>();


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
        const handleData = (res: IWSResponse<IWSHomeData>) =>{
            if (res.route_url === 'home_page'){
                setWsData(res.data)
            }
        }
        ws.subscribe("home_page", handleData)

        const interval = setInterval(() => {
            handleSendHomePage();
        }, 1000);

        return () => {
            clearInterval(interval);
            ws.unsubscribe("home_page", handleData)
        }
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