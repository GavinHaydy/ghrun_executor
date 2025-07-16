import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useTranslation } from 'react-i18next';
import {
    HomeOutlined
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {IconFont} from "@/pages/components/IconFont.ts";

export const MenuLayout: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState<string>(location.pathname);

    useEffect(() => {
        // 当路由改变时更新选中的菜单项
        setSelectedKey(location.pathname);
    }, [location.pathname]);

    type ItemType = Required<MenuProps>['items'][number];

    function getItem(
        label: string,
        key: string,
        icon?: React.ReactNode,
        children?: ItemType[],
    ): ItemType {
        return {
            key,
            icon,
            children,
            label: t(label),
        } as ItemType;
    }

    const items: ItemType[] = [
        getItem('menu.home', '/index', <HomeOutlined />),
        getItem('menu.testObj', '/apis', <IconFont  type={"icon-connect"} />),
        getItem('menu.scene', '/scene', <IconFont type={"icon-scene"} />),
        getItem('menu.performance', '/performance', <IconFont type={"icon-performance"} />),
        getItem('menu.ui', '/ui', <IconFont type={"icon-web-auto"} />),
        getItem('menu.auto', '/auto', <IconFont type={"icon-auto"} />),
        getItem('menu.env', '/env', <IconFont type={"icon-env"} />),
        getItem('menu.machine', '/machine', <IconFont type={"icon-machine"} />),
        getItem('menu.mock', '/mock', <IconFont type={"icon-MOCK"} />),
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key); // 跳转路由
    };

    return (
        <>
            <div className="demo-logo-vertical" />
        <Menu
            mode="inline"
    selectedKeys={[selectedKey]}
    onClick={onClick}
    items={items}
    />
    </>
);
};
