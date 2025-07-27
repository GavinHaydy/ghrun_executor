import React, {useEffect, useState} from "react";
import {ws} from "@/utils/webSocketClientSinglon.ts";
import type {IMachineList, IMachineParams} from "@/types/machineType.ts";
import {useTranslation} from "react-i18next";
import {Table} from "antd";

export const MachinePage: React.FC = () => {
    const {t} = useTranslation()
    const [machineList, setMachineList] = useState<IMachineList>({machine_list: [], total: 0})
    const [searchParams, setSearchParams] = useState<IMachineParams>({page: 1, size: 10, sort_tag: 0, name: ''})

    const handleGetMachineList = () =>{
        const params = {
            route_url:"stress_machine_list",
            param: JSON.stringify(searchParams)
        }
        ws.throttledSend("stress_machine_list",params,1000)
        ws.onMessage((data) => {
            setMachineList(data.data)
        })
    }
    useEffect(() => {
        const interval = setInterval(() => {
            handleGetMachineList();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const columns = [
        {
            title:t('machine.name'),
            dataIndex: 'name',
        },
        {
            title:t('machine.cpuUsage'),
            dataIndex: 'cpu_usage',
        },
        {
            title:t('machine.cpuLoadOne'),
            dataIndex: 'cpu_Load_one',
        },
        {
            title:t('machine.cpuLoadFive'),
            dataIndex: 'cpu_load_five',
        },
        {
            title:t('machine.cpuLoadFifteen'),
            dataIndex: 'cpu_load_fifteen',
        },
        {
            title: t('machine.memUsage'),
            dataIndex: 'mem_usage',
        },
        {
            title: t('machine.diskUsage'),
            dataIndex: 'disk_usage',
        },
        {
            title: t('machine.status'),
            dataIndex: 'status',
        }
    ]
    return (
        // <>
          <div className={'dashboard-container'}>
              <Table columns={columns} dataSource={machineList.machine_list}></Table>
          </div>
        // </>
    )
}