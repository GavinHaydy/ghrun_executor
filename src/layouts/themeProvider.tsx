// src/components/ThemeProvider.tsx
import {ConfigProvider, theme} from "antd";
import React from "react";
import {useSelector} from "react-redux";
import {type RootState} from "@/store"; // 替换为你的实际路径

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const bgColor = mode === "dark" ? "#2d2b30" : undefined;
    const bodyColor = mode === "dark" ? "#1f1f1f" : undefined;
    const primaryColor = mode === "dark" ? "#9254de" : undefined;
    const siderColor = mode === "dark" ? "#2d2b30" : undefined;
    const textColor = mode === 'dark' ? '#cda8f0': undefined

    return (
        <ConfigProvider
            theme={{
                algorithm: mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    colorPrimary: primaryColor, // dark: 蓝色，light: Cyan
                },
                components: {
                    Layout: {
                        headerBg: bgColor,
                        siderBg: siderColor,
                        triggerBg: siderColor,
                        triggerColor: textColor,
                        // colorBgHeader: "#915498",
                        headerHeight: '4vh',
                        // headerColor: '#f56215'
                        bodyBg: bodyColor,
                    },
                    Menu: {
                        itemBg: siderColor,
                        itemHoverBg: bgColor,
                        itemSelectedBg: bgColor,
                        itemSelectedColor:  textColor,
                        activeBarBorderWidth: '0px',
                        // itemHoverColor: mode === "dark" ? darkColor :
                    }
                }
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default ThemeProvider;
