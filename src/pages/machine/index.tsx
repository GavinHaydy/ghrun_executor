import React, {useEffect, useState} from "react";
import {getWebSocket} from "@/utils/webSocketClientSinglon.ts";
import type {IMachine, IMachineList, IMachineParams} from "@/types/machineType.ts";
import {useTranslation} from "react-i18next";
import {Input, Pagination, Table, Tag} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import type {IWSResponse} from "@/utils/wsClient.ts";
import {changeMachineStatusService} from "@/api/machine.ts";

export const MachinePage: React.FC = () => {
    const ws = getWebSocket()
    const {t} = useTranslation()
    const [machineList, setMachineList] = useState<IMachineList>({machine_list: [], total: 0})
    const [searchParams, setSearchParams] = useState<IMachineParams>({page: 1, size: 10, sort_tag: 0, name: ''})

    const handleGetMachineList = () => {
        const params = {
            route_url: "stress_machine_list",
            param: JSON.stringify(searchParams)
        }
        ws.throttledSend("stress_machine_list", params, 1000)
    }

    useEffect(() => {
        // 监听只需要注册一次
        // ws.onMessage((data) => {
        //     setMachineList(data.data)
        // })
        const handleData = (res: IWSResponse<IMachineList>) => {
            if (res.route_url === 'stress_machine_list') {
                setMachineList(res.data)
            }
        }
        ws.subscribe('stress_machine_list', handleData)
        return () => {
            ws.unsubscribe('stress_machine_list', handleData)
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handleGetMachineList();
        }, 1000);
        return () => clearInterval(interval);
    }, [searchParams]);

    const handleChangeMachineStatus = (id: number, status: number) => {
        const payload = {
            id: id,
            status: status === 1 ? 2 : 1
        }
        changeMachineStatusService(payload).then(res => res)

    }

    const columns = [
        {
            title: t('machine.name'),
            dataIndex: 'name',
        },
        {
            title: t('machine.cpuUsage'),
            dataIndex: 'cpu_usage',
            sorter: true,
            render: (usage: number) => {
                return (
                    <Tag color={usage > 80 ? 'red' : 'green'}>
                        {usage.toFixed(2)}%
                    </Tag>
                )
            }
        },
        {
            title: t('machine.cpuLoadOne'),
            dataIndex: 'cpu_Load_one',
        },
        {
            title: t('machine.cpuLoadFive'),
            dataIndex: 'cpu_load_five',
        },
        {
            title: t('machine.cpuLoadFifteen'),
            dataIndex: 'cpu_load_fifteen',
        },
        {
            title: t('machine.memUsage'),
            dataIndex: 'mem_usage',
            sorter: true,
            render: (usage: number) => {
                return (
                    <Tag color={usage > 80 ? 'red' : 'green'}>
                        {usage.toFixed(2)}%
                    </Tag>
                )
            }
        },
        {
            title: t('machine.diskUsage'),
            dataIndex: 'disk_usage',
            sorter: true,
            render: (usage: number) => {
                return (
                    <Tag color={usage > 80 ? 'red' : 'green'}>
                        {usage.toFixed(2)}%
                    </Tag>
                )
            }
        },
        {
            title: t('machine.type'),
            dataIndex: 'server_type',
            render: (type: number) => type === 1 ? t("machine.primary") : t("machine.backup")
        },
        {
            title: t('machine.operation'),
            dataIndex: 'status',
            // render: (status: number) =>status === 1 ? t("machine.disable") : t("machine.enable")
            render: (status: number, record: IMachine) => {
                return (
                    <Tag color={status === 1 ? 'blue' : 'green'} onClick={() => {
                        handleChangeMachineStatus(record.id, status)
                    }}>
                        {status === 1 ? t("machine.disable") : t("machine.enable")}
                    </Tag>
                )
            }
        },
    ]
    return (
        // <>
        <div className={'dashboard-container'}>
            <Input style={{width: '12%'}}
                   addonBefore={<SearchOutlined/>}
                   placeholder={t('machine.searchPlaceholder')}
                   onChange={(e) => {
                       setSearchParams({...searchParams, name: e.target.value})
                   }}></Input>
            <Table columns={columns}
                   dataSource={machineList.machine_list}
                   rowKey="name" // 确保每行有唯一 key，避免重渲染
                   locale={{
                       emptyText: '', // 👈 没数据时不要显示“暂无数据”
                   }}
                   pagination={false}
                   onChange={(_pagination, _filters, sorter) => {
                       if (!Array.isArray(sorter)) {
                           const order = sorter.order
                           let sort_tag = 0
                           switch (sorter.field) {
                               case 'cpu_usage':
                                   sort_tag = order === 'descend' ? 1 : order === 'ascend' ? 2 : 0
                                   break
                               case 'mem_usage':
                                   sort_tag = order === 'descend' ? 3 : order === 'ascend' ? 4 : 0
                                   break
                               case 'disk_usage':
                                   sort_tag = order === 'descend' ? 5 : order === 'ascend' ? 6 : 0
                                   break
                               default:
                                   sort_tag = 0
                           }
                           setSearchParams(prev => ({
                               ...prev,
                               sort_tag: sort_tag
                           }))
                       }
                   }}
            ></Table>
            <Pagination
                total={machineList.total}
                align={'center'}
                showSizeChanger={true}
                onChange={(page, pageSize) => {
                    setSearchParams({...searchParams, page: page, size: pageSize});
                }}
            ></Pagination>
        </div>
        // </>
    )
}