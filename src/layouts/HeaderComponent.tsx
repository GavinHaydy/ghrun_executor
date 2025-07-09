import React, {useCallback, useEffect} from "react";
import {Button, Dropdown} from "antd";
import {IconFont} from "@/pages/components/IconFont.ts";
import "./header.less"
import {getUserSettingService} from "@/api/setting.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/store";
import {setSettings} from "@/store/modules/settingSlice.ts";

export const HeaderComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {settings} = useSelector((state: RootState) => state.setting);
    const handleGetUserSetting = useCallback(() => {
        getUserSettingService().then((res) => {
            if (res.em === "success"){
                dispatch(setSettings(res.data))
                console.log(res)
            }
        })
    },[dispatch])

    useEffect(() => {
        handleGetUserSetting()
    }, [handleGetUserSetting]);

    const customContent = (
        <div style={{ padding: 8 }}>
            <p>{settings.current_team_id}</p>
            <button>点我</button>
        </div>
    );

    return (
        <div>
            <Dropdown className={"header-left"}
            popupRender={() =>{

                return customContent;
            }}>
                <Button>
                    gavin
                    <IconFont type={"icon-down"}/>
                </Button>

            </Dropdown>
        </div>
    )

};