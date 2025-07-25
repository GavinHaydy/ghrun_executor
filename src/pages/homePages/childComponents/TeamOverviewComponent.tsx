import type {ApiCountComponentProps} from "@/pages/homePages/childComponents/ApiCountComponent.tsx";
import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts'

export const TeamOverviewComponent: React.FC<ApiCountComponentProps> = ({data}) => {
    const barRef = useRef<HTMLDivElement>(null);

    const {
        auto_plan_exec_num,
        auto_plan_total_num,
        stress_plan_exec_num,
        stress_plan_total_num,
        team_name
    } = data?.team_overview[0] ?? {};

    const rawData = [
        auto_plan_exec_num,
        auto_plan_total_num - auto_plan_exec_num,
        stress_plan_exec_num,
        stress_plan_total_num - stress_plan_exec_num
    ];
    const names = ['自动化-已执行', '自动化-未执行', '性能-已执行', '性能-未执行']

    useEffect(() => {
        if (!barRef.current) return

        const barEl = barRef.current

        const series = rawData.map((val, i) => ({
            name: names[i],
            type: 'bar',
            stack: 'total', // 堆叠
            label: {
                show: true,
                position: 'inside',
                formatter: () => val.toString()
            },
            data: [val]
        }));

        const option = {
            title: {
                text: '团队总览',
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                data: names,
                top: '5%',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '1%',
                top: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: [team_name],
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series
        }

        const barObserver = new ResizeObserver(() => {
            const bar = echarts.init(barRef.current)
            bar.setOption(option)
            bar.resize()
            barObserver.disconnect()
        })
        barObserver.observe(barEl)

        return () => {
            barObserver.disconnect()
        }
    }, []);
    return (
        <>
            <div ref={barRef} style={{width: '100%', height: '100%'}}></div>
        </>
    )
}