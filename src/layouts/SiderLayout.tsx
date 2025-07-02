import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useTranslation } from 'react-i18next';
import {
    HomeOutlined,
    UsergroupAddOutlined,
    SwitcherOutlined,
    SettingOutlined
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
        getItem('menu.work', '/work', <HomeOutlined />),
        getItem('menu.memberManager', '/member', <UsergroupAddOutlined />),
        getItem('menu.roleManager', '/role', <SwitcherOutlined />),
        getItem('menu.setting', '/settings', <SettingOutlined />),
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
