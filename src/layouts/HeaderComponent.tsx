import React, {useCallback, useEffect, useState} from "react";
import {Button, Dropdown, Input} from "antd";
import {IconFont} from "@/pages/components/IconFont.ts";
import "./header.less"
import {getUserSettingService} from "@/api/setting.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/store";
import {setSettings} from "@/store/modules/settingSlice.ts";
import {ServiceTeamList} from "@/api/team.ts";
import type {ITeam} from "@/types/teamType.ts";
import {SearchOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

export const HeaderComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {t} = useTranslation()

    const [teamList, setTeamList] = useState<ITeam[]>([]);

    const handleGetUserSetting = useCallback(() => {
        getUserSettingService().then((res) => {
            if (res.em === "success") {
                dispatch(setSettings(res.data))
                console.log(res)
            }
        })
    }, [dispatch])

    const handleGetTeamList = () => {
        ServiceTeamList().then(r => {
            if (r.em === "success" && r.data.teams.length > 0) {
                setTeamList(r.data.teams)
            }
        })
    }

    useEffect(() => {
        handleGetUserSetting()
        handleGetTeamList()
    }, [handleGetUserSetting]);

    return (
        <div>
            <Dropdown className={"header-left"}
                      overlayStyle={{width: '20%'}}
                      popupRender={() => {
                          return (
                              <div>
                                  <div className={"header-team-content"}>
                                      <div>团队</div>
                                      <Button>{t("btn.teamManager")}</Button>
                                  </div>
                                  <div>
                                      <Input addonBefore={<SearchOutlined />}
                                             style={{borderRadius: 999,
                                                 overflow: 'hidden',
                                                border: '1px solid'}}
                                      ></Input>
                                  </div>
                                  {teamList.map((item: ITeam) => (
                                      <div className={"header-team-body"}>
                                          <div className={"header-body-left"}>{item.name}</div>
                                          <div style={{color:"orange"}}>{item.cnt}</div>
                                      </div>
                                  ))}
                              </div>
                          );
                      }}>
                <Button>
                    gavin
                    <IconFont type={"icon-down"}/>
                </Button>

            </Dropdown>
        </div>
    )

};