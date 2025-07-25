import * as echarts from 'echarts';
import React, {useEffect, useRef} from "react";
import './apiComponentStyle.less'
import type {IWSHomeData} from "@/types/ws/homeType.ts";

export interface ApiCountComponentProps{
    data: IWSHomeData
}

export const ApiCountComponent: React.FC<ApiCountComponentProps> = ({data}) => {

    const chartRef = useRef<HTMLDivElement>(null);
    const chartRefScene = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const lineRefScene = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return
        if (!chartRefScene.current) return
        if (!lineRef.current)return
        if (!lineRefScene.current)return

        const chartEl = chartRef.current
        const chartElScene = chartRefScene.current
        const lineEl = lineRef.current
        const lineElScene = lineRef.current

        const referenced = data?.api_manage_data.api_cite_count??0; // 被引用接口数量
        const total = data?.api_manage_data.api_total_count??0;
        const unreferenced = total - referenced; // 未被引用接口数量
        // scene
        const referencedScene = data?.scene_manage_data.scene_cite_count??0; // 被引用接口数量
        const totalScene = data?.scene_manage_data.scene_total_count??0;
        const unreferencedScene = total - referenced; // 未被引用接口数量

        const optionApi = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            title:{
              text: '接口管理数量统计',
              left: 'left',
              top: 'top',
              textStyle:{
                  fontSize: 12,
              }
            },
            series: [
                {
                    name: '接口引用情况',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: 'center',
                        fontSize: 12,
                        fontWeight: 'bold',
                        formatter: `总接口数\n${total}`
                    },
                    emphasis: {
                        label: {
                            show: false,
                            position: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            formatter: `总数\n${total}`
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: referenced, name: '被引用接口'},
                        {value: unreferenced, name: '未被引用接口'}
                    ]
                }
            ]
        };

        const optionApiScene = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            title:{
                text: '场景管理数量统计',
                left: 'left',
                top: 'top',
                textStyle:{
                    fontSize: 12,
                }
            },
            series: [
                {
                    name: '接口引用情况',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: 'center',
                        fontSize: 12,
                        fontWeight: 'bold',
                        formatter: `总接口数\n${total}`
                    },
                    emphasis: {
                        label: {
                            show: false,
                            position: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            formatter: `总数\n${totalScene}`
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: referencedScene, name: '被引用场景'},
                        {value: unreferencedScene, name: '未被引用场景'}
                    ]
                }
            ]
        };

        const lineOption = {
            title: {
                text: '近7日',
            },
            tooltip: {
                trigger: 'axis',
            },
            grid: {
              left: '8%',
              right: '5%',
              bottom: '10%',
              containLabel: false
            },
            xAxis: {
                type: 'category',
                data: Object.keys(data?.api_manage_data?.api_add_count??{})
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '新增数',
                    stack: 'Total',
                    data: Object.values(data?.api_manage_data?.api_add_count??{}),
                    type: 'line',
                },
                {
                    name: '调试数',
                    stack: 'Total',
                    data: Object.values(data?.api_manage_data?.api_debug??{}),
                    type: 'line',
                }
            ]
        }
        const lineSceneOption = {
            title: {
                text: '近7日',
            },
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                left: '8%',
                right: '5%',
                bottom: '10%',
                containLabel: false
            },
            xAxis: {
                type: 'category',
                data: Object.keys(data?.scene_manage_data?.scene_add_count??{})
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '新增数',
                    stack: 'Total',
                    data: Object.values(data?.scene_manage_data?.scene_debug_count??{}),
                    type: 'line',
                },
                {
                    name: '调试数',
                    stack: 'Total',
                    data: Object.values(data?.api_manage_data?.api_debug??{}),
                    type: 'line',
                }
            ]
        }

        const observer = new ResizeObserver(()=>{
            const chart = echarts.init(chartRef.current);
            chart.setOption(optionApi)
            chart.resize()
            observer.disconnect()
        })
        const observerScene = new ResizeObserver(()=>{
            const chart = echarts.init(chartRefScene.current);
            chart.setOption(optionApiScene)
            chart.resize()
            observer.disconnect()
        })

        const lineObserver = new ResizeObserver(()=>{
            const bar = echarts.init(lineRef.current)
            bar.setOption(lineOption)
            bar.resize()
            lineObserver.disconnect()
        })
        const lineSceneObserver = new ResizeObserver(()=>{
            const lineScene = echarts.init(lineRefScene.current)
            lineScene.setOption(lineSceneOption)
            lineScene.resize()
            lineSceneObserver.disconnect()
        })
        observer.observe(chartEl)
        observerScene.observe(chartElScene)
        lineObserver.observe(lineEl)
        lineSceneObserver.observe(lineElScene)
        return ()=>{
            observer.disconnect()
            observerScene.disconnect()
            lineObserver.disconnect()
            lineSceneObserver.disconnect()
        }
    }, []);


    return (
        <>
            {/*<div style={{display: 'flex', flexDirection: 'column'}}>*/}
            {/*    <div style={{float: 'left'}}>gavin</div>*/}
            {/*    <div ref={chartRef} style={{width: '30%', height: '40%', border: 'none'}}></div>*/}
            {/*    <div ref={chartRef1} style={{width: '30%', height: '40%', border: 'none'}}></div>*/}
            {/*</div>*/}
            <div className="dashboard-layout">
                <div className="dashboard-title">标题</div>

                <div className="dashboard-row">
                    <div className="dashboard-col left">
                        <div ref={chartRef} style={{width: '100%', height: '100%', border: 'none'}}></div>
                    </div>
                    <div className="dashboard-col right">
                        <div ref={lineRef} style={{width: '100%', height: '100%', border: 'none'}}></div>
                    </div>
                </div>

                <div className="dashboard-row">
                    <div className="dashboard-col left">
                        <div ref={chartRefScene} style={{width: '100%', height: '100%', border: 'none'}}></div>
                    </div>
                    <div className="dashboard-col right">
                        <div ref={lineRefScene} style={{width: '100%', height: '100%', border: 'none'}}></div>
                    </div>
                </div>
            </div>

        </>

    )
}