import type {ApiCountComponentProps} from "@/pages/homePages/childComponents/ApiCountComponent.tsx";
import * as echarts from "echarts";
import React, {useEffect, useRef} from "react";

export const CaseComponent: React.FC<ApiCountComponentProps> = ({data}) => {

    const lineChartRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (!lineChartRef.current) return
        const lineEl = lineChartRef.current;

        const lineOption = {
            title: {
                text: '近7日新增用例'
            },
            tooltip: {
                trigger: 'axis'
            },
            grid:{
                left: '10%',
                right: '4%',
                bottom: '10%',
                top: '10%',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: Object.keys(data?.case_add_seven_data??{})
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'case',
                    stack: 'total',
                    data: Object.values(data?.case_add_seven_data??{}),
                    type: 'bar',
                }
            ]
        }

        const lineObserver = new ResizeObserver(()=>{
            const line = echarts.init(lineChartRef.current)
            line.setOption(lineOption)
            line.resize()
            lineObserver.disconnect()
        })

        lineObserver.observe(lineEl)
        return ()=>{
            lineObserver.disconnect()
        }
    }, []);
    return (
        <>
            <div ref={lineChartRef} style={{width: '100%', height: '100%'}}></div>
        </>
    )
}