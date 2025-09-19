import {Col, Row, Select} from "antd";
import {NoAuthComponent} from "@/pages/components/auth/noAuth.tsx";
import {useEffect, useState} from "react";
import {OneWayComponent} from "@/pages/components/auth/oneWay.tsx";
import {MutualAuthComponent} from "@/pages/components/auth/mutualAuth.tsx";
import {PrivateKVPComponent} from "@/pages/components/auth/privateKVP.tsx";
import type {IPrivateKV} from "@/types/targets/authType.ts";

export const AuthComponent = () => {

    const [selected, setSelected] = useState<string>("1");
    const [kv, setKv] = useState<IPrivateKV>({
        key: '',
        value: ''
    });
    useEffect(() => {
        console.log(kv)
    }, [kv]);

    const options = [
        {value: "1", label: "a", component: <NoAuthComponent/>},
        {value: "2", label: "b", component: <OneWayComponent/>},
        {value: "3", label: "c", component: <MutualAuthComponent/>},
        {value: "4", label: "d", component: <PrivateKVPComponent onChange={setKv}/>},
        {value: "5", label: "e"},
        {value: "6", label: "f"}
    ]

    // 找到选中的配置
    const current = options.find((item) => item.value === selected);

    return (

        <Row>
            <Col span={4}>
                <Select
                    style={{width: "100%"}}
                    options={options}
                    value={selected}
                    onChange={(val) => setSelected(val)}
                />
            </Col>
            <Col offset={2}>
                {current?.component}
            </Col>
        </Row>
    )
}