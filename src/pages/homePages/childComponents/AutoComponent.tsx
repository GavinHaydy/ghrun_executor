import React, {useEffect} from "react";
import './autoComponentStyle.less'
// import * as eachars from 'echarts'
import type {ApiCountComponentProps} from "@/pages/homePages/childComponents/ApiCountComponent.tsx";
// import type {IWSAutoPlanData} from "@/types/ws/homeType.ts";

export const AutoComponent: React.FC<ApiCountComponentProps> = ({data}) => {

    useEffect(() => {
        // const autoData:IWSAutoPlanData = data?.auto_plan_data


    }, []);

    return (
        <>
            <div className="home-auto-container">
                <div className="home-auto-header">自动化测试</div>

                <div className="home-auto-middle">
                    <div className="home-auto-left">
                        <div className="home-auto-left-top">
                            <div>123</div>
                            <div>123</div>
                            <div>123</div>
                            <div>123</div>
                            <div>123</div>
                        </div>
                        <div className="home-auto-left-bottom">
                            <div className="home-auto-bottom-left">Bottom Left</div>
                            <div className="home-auto-bottom-right">Bottom Right</div>
                        </div>
                    </div>
                    <div className="home-auto-right">Right</div>
                </div>

                <div className="home-auto-footer">Footer</div>
            </div>
        </>
    )
}