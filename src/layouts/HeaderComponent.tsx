import React, {useCallback, useEffect, useRef, useState} from "react";
import {Avatar, Button, Card, Divider, Dropdown, Input, message, Switch} from "antd";
import {IconFont} from "@/pages/components/IconFont.ts";
import "./header.less"
import {getUserSettingService, setUserSettingService} from "@/api/setting.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/store";
import {setSettings} from "@/store/modules/settingSlice.ts";
import {ServiceTeamList, ServiceTeamMembers} from "@/api/team.ts";
import type {ITeam, ITeamMember, ITeamMemberList} from "@/types/teamType.ts";
import {SearchOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {useUserInfo} from "@/hooks/useSettings.ts";
import {setMode} from "@/store/theme/themeSlice.ts";
import {setLang} from "@/store/lang.ts";
import {
    TeamMemberComponent,
    type TeamMemberModalRef,
    type TeamMemberModalProps
} from "@/layouts/HeaderFunctionComponent/TeamMemberComponent.tsx";
import {useAuthInfo} from "@/hooks/useAuthInfo.ts";
import {logoutService} from "@/api/auth.ts";
import {InviteMemberModal, type InviteMemberModalRef} from "@/layouts/HeaderFunctionComponent/InviteComponent.tsx";
import {ws} from "@/utils/webSocketClientSinglon.ts";
import Cookies from "js-cookie";


export const HeaderComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentTeamId = Cookies.get('team_id')??'';
    const userInfo = useUserInfo();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const lang = useSelector((state: RootState) => state.lang.lang);
    const teamMemberModalRef = useRef<TeamMemberModalRef>(null);
    const inviteMemberModalRef = useRef<InviteMemberModalRef>(null);
    const updateToken = useAuthInfo().updateToken
    const token = Cookies.get("token")


    const {t} = useTranslation()

    const [messageApi, contextHolder] = message.useMessage();
    const [teamList, setTeamList] = useState<ITeam[]>([]);
    const [teamMemberList, setTeamMemberList] = useState<ITeamMemberList>({members: [], total: 0})

    // 修改语言
    const handleLanguageChange = (language: string) => {
        // 处理切换事件
        // 更新 i18next 语言
        dispatch(setLang(language))
    };

    const handleGetTeamList = useCallback(() => {
        ServiceTeamList().then(r => {
            if (r.em === "success" && r.data.teams.length > 0) {
                setTeamList(r.data.teams)
            }
        })
    }, [])

    const handleTeamMemberList = (data = {}) => {
        const tempTeamMemberList: ITeamMemberList = {members: [], total: 0}
        ServiceTeamMembers({...data}).then(r => {
            if (r.em === "success" && r.data.members.length > 0) {
                r.data.members.map((item: ITeamMember) => {
                    item.key = item.user_id
                })
                tempTeamMemberList.members = r.data.members
                tempTeamMemberList.total = r.data.total
            }
            setTeamMemberList(tempTeamMemberList)
        })
    }
    // 获取团队成员列表
    const handleGetTeamMemberList = () => {
        handleTeamMemberList({team_id: currentTeamId})
    }

    const handleSetUserSetting = async () => {
        // const queryParams = new URLSearchParams(window.location.search);
        // const teamId = Cookies.get("team_id");
        // console.log(currentTeamId)
        await setUserSettingService({settings: {current_team_id: currentTeamId}})
    }
    const handleGetUserSetting = async () => {
        await handleSetUserSetting()

        const res = await getUserSettingService()
        if (res.em === "success") {
            dispatch(setSettings(res.data))
            handleGetTeamList()
            handleGetTeamMemberList()
        }
    }

    const handleStartHeartbeat = () => {
        const params = {
            token: token,
            team_id: currentTeamId
        }

        const start_heartbeat = {
            route_url: "start_heartbeat",
            param: JSON.stringify(params)
        }
        ws.send(start_heartbeat)
    };


    useEffect(() => {
        ws.startHeartbeat(handleStartHeartbeat)
        handleGetUserSetting().then()
    }, []);


    const handleOpenMembersModal = (teamId: string) => {
        teamMemberModalRef.current?.open(teamId)
    }

    const handleSearchTeamMember: TeamMemberModalProps['onParamsChange'] = (data) => {
        handleTeamMemberList({team_id: currentTeamId, ...data})
    }

    const handleLogout = () => {
        logoutService().then(r => {
            if (r.em === "success") {
                messageApi.success(r.et).then()
                updateToken("")
                window.location.href = "http://localhost:5173/login";
            } else {
                messageApi.error(r.et).then()
            }
        })
    }

    const handleChangeInviteModalStage = () => {
        inviteMemberModalRef.current?.openModal();
    }

    return (
        <div className={'header-container'}>
            {contextHolder}
            <Dropdown className={"header-left"}
                      overlayStyle={{width: '20%'}}
                      popupRender={() => {
                          return (
                              <Card>
                                  <div className={"header-team-content"}>
                                      <div>{t("label.team")}</div>
                                      <Button type={"primary"}>{t("btn.teamManager")}</Button>
                                  </div>
                                  <div>
                                      <Input addonBefore={<SearchOutlined/>}
                                             style={{
                                                 borderRadius: 999,
                                                 overflow: 'hidden',
                                                 border: '1px solid'
                                             }}
                                      ></Input>
                                  </div>
                                  {teamList.map((item: ITeam) => (
                                      <div className={"header-team-body"}>
                                          <div className={"header-body-left"}>{item.name}</div>
                                          <div style={{color: "orange"}}>{item.cnt}</div>
                                      </div>
                                  ))}
                              </Card>
                          );
                      }}>
                <Button>
                    gavin
                    <IconFont type={"icon-down"}/>
                </Button>

            </Dropdown>

            <div className={'header-right'}>
                <Dropdown
                    popupRender={() => {
                        return (
                            <Card className={'header-user-info'}>
                                <div>{t('label.userHome')}</div>
                                <Divider size={"small"}/>
                                <div className={"lang-switch"}>
                                    <div className={lang === 'zh' ? 'active' : ''}
                                         onClick={() => handleLanguageChange('zh')}>中文
                                    </div>
                                    <div className={lang === 'en' ? 'active' : ''}
                                         onClick={() => handleLanguageChange('en')}>English
                                    </div>
                                </div>
                                <Divider size={"small"}/>
                                <div onClick={handleLogout}>{t('label.logout')}</div>
                            </Card>
                        )
                    }}>
                    <Avatar src={userInfo.avatar}/>
                </Dropdown>

                <div onClick={() => handleOpenMembersModal(currentTeamId)} className={'header-member-num'}>
                    <p>{teamMemberList.total}</p>
                </div>
                <Button type={"primary"} onClick={() => {
                    handleChangeInviteModalStage()
                }}>
                    <IconFont type={'icon-invite'}/>
                    {t('label.invite')}
                </Button>
                <Button>{t('label.history')}</Button>
                <Switch
                    checked={mode === 'dark'}
                    onChange={(checked) => dispatch(setMode(checked ? 'dark' : "light"))}
                    checkedChildren="🌙"
                    unCheckedChildren="☀️"
                />
            </div>

            <TeamMemberComponent ref={teamMemberModalRef} data={teamMemberList}
                                 onParamsChange={handleSearchTeamMember}/>
            <InviteMemberModal ref={inviteMemberModalRef} onAddSuccess={handleGetTeamMemberList}/>
        </div>
    )

};