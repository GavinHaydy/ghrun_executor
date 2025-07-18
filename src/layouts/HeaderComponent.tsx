import React, {useCallback, useEffect, useRef, useState} from "react";
import {Avatar, Button, Card, Divider, Dropdown, Input, Switch} from "antd";
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
import {useCurrentTeamId, useUserInfo} from "@/hooks/useSettings.ts";
import {setMode} from "@/store/theme/themeSlice.ts";
import {setLang} from "@/store/lang.ts";
import i18n from "@/locales/i18n.ts";
import {TeamMemberComponent, type TeamMemberModalRef,type TeamMemberModalProps} from "@/layouts/UserInfoComponent/TeamMemberComponent.tsx";


export const HeaderComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentTeamId = useCurrentTeamId();
    const userInfo = useUserInfo();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const lang = useSelector((state: RootState) => state.lang.lang);
    const teamMemberModalRef = useRef<TeamMemberModalRef>(null);


    const {t} = useTranslation()

    const [teamList, setTeamList] = useState<ITeam[]>([]);
    const [teamMemberList, setTeamMemberList] = useState<ITeamMemberList>({members: [], total: 0})

    // 修改语言
    const handleLanguageChange = (language: string) => {
        // 处理切换事件
        // 更新 i18next 语言
        dispatch(setLang(language))
        i18n.changeLanguage(language).then(() => {
        });
    };

    const handleGetTeamList = useCallback(() => {
        ServiceTeamList().then(r => {
            if (r.em === "success" && r.data.teams.length > 0) {
                setTeamList(r.data.teams)
            }
        })
    }, [])

    // 获取团队成员列表
    const handleGetTeamMemberList = useCallback((teamId: string) => {
        ServiceTeamMembers({team_id: currentTeamId || teamId}).then(r => {
            if (r.em === "success" && r.data.members.length > 0) {
                const tempTeamMemberList: ITeamMemberList = {members: [], total: 0}
                r.data.members.map((item: ITeamMember) => {
                    item.key = item.user_id
                })
                tempTeamMemberList.members = r.data.members
                tempTeamMemberList.total = r.data.total
                setTeamMemberList(tempTeamMemberList)

            }
        })
    }, [currentTeamId])

    const handleGetUserSetting = useCallback(async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const teamId = queryParams.get("team_id");
        await setUserSettingService({settings: {current_team_id: teamId}})

        getUserSettingService().then((res) => {
            if (res.em === "success") {
                dispatch(setSettings(res.data))
                handleGetTeamList()
                handleGetTeamMemberList(res.data.settings.current_team_id)
            }
        })
    }, [dispatch, handleGetTeamList, handleGetTeamMemberList])

    useEffect(() => {
        handleGetUserSetting().then()
    }, [handleGetUserSetting]);


    const handleOpenMembersModal = (teamId: string) => {
        teamMemberModalRef.current?.open(teamId)
    }

    const handleTest:TeamMemberModalProps['onParamsChange']=(data)=>{
        ServiceTeamMembers({team_id: currentTeamId,...data}).then(r => {
            if (r.em === "success" && r.data.members.length > 0) {
                const tempTeamMemberList: ITeamMemberList = {members: [], total: 0}
                r.data.members.map((item: ITeamMember) => {
                    item.key = item.user_id
                })
                tempTeamMemberList.members = r.data.members
                tempTeamMemberList.total = r.data.total
                setTeamMemberList(tempTeamMemberList)

            }
        })
    }

    return (
        <div className={'header-container'}>
            <Dropdown className={"header-left"}
                      overlayStyle={{width: '20%'}}
                      popupRender={() => {
                          return (
                              <Card>
                                  <div className={"header-team-content"}>
                                      <div>团队</div>
                                      <Button>{t("btn.teamManager")}</Button>
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
                                    <div className={lang === 'zh' ? 'active' : ''} onClick={() => handleLanguageChange('zh')}>中文</div>
                                    <div className={lang === 'en' ? 'active' : ''} onClick={() => handleLanguageChange('en')}>English</div>
                                </div>
                                <Divider size={"small"}/>
                                <div>{t('label.logout')}</div>
                            </Card>
                        )
                    }}>
                    <Avatar src={userInfo.avatar}/>
                </Dropdown>

                <div onClick={() =>handleOpenMembersModal(currentTeamId)} className={'header-member-num'}>
                    <p>{teamMemberList.total}</p>
                </div>
                <Button type={"primary"}>
                    <IconFont type={'icon-invite'}/>
                    {t('label.invite')}
                </Button>
                <Button>{t('label.history')}</Button>
                <Switch
                    // style={{float: "right"}}
                    // checked={mode === 'dark'}
                    checked={mode === 'dark'}
                    onChange={(checked) => dispatch(setMode(checked ? 'dark' : "light"))}
                    checkedChildren="🌙"
                    unCheckedChildren="☀️"
                />
            </div>

            <TeamMemberComponent ref={teamMemberModalRef} data={teamMemberList} onParamsChange={handleTest}/>
        </div>
    )

};