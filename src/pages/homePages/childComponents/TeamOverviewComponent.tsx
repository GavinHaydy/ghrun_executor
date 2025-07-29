import type {ApiCountComponentProps} from "@/pages/homePages/childComponents/ApiCountComponent.tsx";
import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts'

export const TeamOverviewComponent: React.FC<ApiCountComponentProps> = ({data}) => {
    const barRef = useRef<HTMLDivElement>(null);

    const names = ['自动化-已执行', '自动化-未执行', '性能-已执行', '性能-未执行']

    useEffect(() => {
        const teams:string[] = data?.team_overview.map(item => item.team_name)
        const r: number[][] = data?.team_overview.map(item => ([
            item.auto_plan_exec_num,
            item.auto_plan_total_num - item.auto_plan_exec_num,
            item.stress_plan_exec_num,
            item.stress_plan_total_num - item.stress_plan_exec_num
        ]))

        const series = names.map((name, sid) => {
            return {
                name,
                type: 'bar',
                stack: 'total',
                label: {
                    show: true,
                    // formatter: totalData
                    formatter: (params: any) => {
                        const val = params.value;
                        return val > 1 ? val : '';
                    }
                },
                data: r.map(item => item[sid])
            };
        });
        if (!barRef.current) return

        const barEl = barRef.current

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
                bottom: '6%',
                top: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: teams,
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