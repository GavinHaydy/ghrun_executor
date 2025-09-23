import {Col, Row, Select} from "antd";
import {NoAuthComponent} from "@/pages/components/auth/noAuth.tsx";
import {useEffect, useState} from "react";
import {OneWayComponent} from "@/pages/components/auth/oneWay.tsx";
import {MutualAuthComponent} from "@/pages/components/auth/mutualAuth.tsx";
import {PrivateKVPComponent} from "@/pages/components/auth/privateKVP.tsx";
import type {IBasic, IBearer, IDigest, IPrivateKV} from "@/types/targets/authType.ts";
import {BearerComponent} from "@/pages/components/auth/bearer.tsx";
import {useTranslation} from "react-i18next";
import {BasicAuthComponent} from "@/pages/components/auth/basicAuth.tsx";
import {DigestAuthComponent} from "@/pages/components/auth/digestAuth.tsx";

export const AuthComponent = () => {
    const {t} = useTranslation();

    const [selected, setSelected] = useState<string>("1");
    const [kv, setKv] = useState<IPrivateKV>({
        key: '',
        value: ''
    });
    const [bearer,setBearer] = useState<IBearer>({key:''})
    const [basic, setBasic] = useState<IBasic>({username: '',password:''})
    const [digest, setDigest] = useState<IDigest>({
        algorithm: '',
        cnonce: '',
        nc: '',
        nonce: '',
        opaque: '',
        password: '',
        qop: '',
        realm: '',
        username: ''
    })
    useEffect(() => {
        console.log(kv)
    }, [kv]);
    useEffect(() => {
        console.log(bearer)
    }, [bearer]);
    useEffect(() =>{
        console.log(basic)
    },[basic])
    useEffect(() => {
        console.log(digest)
    }, [digest]);

    const options = [
        {value: "1", label: "a", component: <NoAuthComponent/>},
        {value: "2", label: "b", component: <OneWayComponent/>},
        {value: "3", label: "c", component: <MutualAuthComponent/>},
        {value: "4", label: "d", component: <PrivateKVPComponent onChange={setKv}/>},
        {value: "5", label: t('bearerAuth'), component: <BearerComponent onChange={setBearer}/>},
        {value: "6", label: t('basicAuth'),component: <BasicAuthComponent onChange={setBasic}/>},
        {value: "7", label: t('digestAuth'),component: <DigestAuthComponent onChange={setDigest}/>}
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
            <Col offset={1}>
                {current?.component}
            </Col>
        </Row>
    )
}