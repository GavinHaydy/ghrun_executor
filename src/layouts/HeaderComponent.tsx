import React, {useCallback, useEffect, useState} from "react";
import {Avatar, Button, Dropdown, Input, Switch} from "antd";
import {IconFont} from "@/pages/components/IconFont.ts";
import "./header.less"
import {getUserSettingService} from "@/api/setting.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/store";
import {setSettings} from "@/store/modules/settingSlice.ts";
import {ServiceTeamList, ServiceTeamMembers} from "@/api/team.ts";
import type {ITeam, ITeamMemberList} from "@/types/teamType.ts";
import {SearchOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {useCurrentTeamId, useUserInfo} from "@/hooks/useSettings.ts";
import {setMode} from "@/store/theme/themeSlice.ts";

export const HeaderComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentTeamId = useCurrentTeamId();
    const userInfo = useUserInfo();
    const {t} = useTranslation()


    const [teamList, setTeamList] = useState<ITeam[]>([]);
    const [teamMemberList, setTeamMemberList] = useState<ITeamMemberList>({members: [], total: 0})



    const handleGetTeamList = useCallback(() => {
        ServiceTeamList().then(r => {
            if (r.em === "success" && r.data.teams.length > 0) {
                setTeamList(r.data.teams)
            }
        })
    },[])

    // 获取团队成员列表
    const handleGetTeamMemberList = useCallback((teamId: string) => {
        ServiceTeamMembers({team_id: currentTeamId || teamId}).then(r => {
            if (r.em === "success" && r.data.members.length > 0) {
                const tempTeamMemberList: ITeamMemberList = {members: [], total: 0}
                tempTeamMemberList.members = r.data.members
                tempTeamMemberList.total = r.data.total
                setTeamMemberList(tempTeamMemberList)

            }
        })
    },[currentTeamId])

    const handleGetUserSetting = useCallback(() => {
        getUserSettingService().then((res) => {
            if (res.em === "success") {
                dispatch(setSettings(res.data))
                handleGetTeamList()
                handleGetTeamMemberList(res.data.settings.current_team_id)
            }
        })
    },[dispatch,handleGetTeamList,handleGetTeamMemberList])

    useEffect(() => {
        handleGetUserSetting()
    },[handleGetUserSetting]);

    return (
        <div className={'header-container'}>
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

            <div className={'header-right'}>
                <Avatar src={userInfo.avatar}/>
                <div className={'header-member-num'}>
                    <p>{teamMemberList.total}</p>
                </div>
                <Button>邀请</Button>
                <Button>操作日志</Button>
                <Switch
                    // style={{float: "right"}}
                    // checked={mode === 'dark'}
                    onChange={(checked) => dispatch(setMode(checked ? 'dark' : "light"))}
                    checkedChildren="🌙"
                    unCheckedChildren="☀️"
                />
            </div>

        </div>
    )

};