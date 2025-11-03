import {SubjectLeftComponent} from "@/pages/testSubject/SubjectLeftComponent.tsx";
import {useEffect, useState} from "react";
import type {ITargetFolder, ITargetList, ITargetSave} from "@/types/targetType.ts";
import {useAuthInfo} from "@/hooks/useAuthInfo.ts";
import {ServiceTargetDetail, ServiceTargetList} from "@/api/target.ts";
// import {SubjectRightComponent} from "@/pages/testSubject/SubjectRightComponent.tsx";
import {RightTagComponent} from "@/pages/testSubject/RightTagComponent.tsx";
import type {IRespAPIDetail} from "@/types/resp/targetResp.ts";


export const TestSubjectPage = () => {
    const currentTeamId = useAuthInfo().teamId as string
    const [dataList, setDataList] = useState<(IRespAPIDetail|ITargetSave)[]>([])
    const [now_target, setNow_target] = useState<string>('')
    const [listData, setListData] = useState<ITargetList>({targets: [], total: 0})


    const handleAddItem = (item: ITargetSave) => {
        setDataList([...dataList, item])
        console.log(dataList)
    }

    const handleGetTargetList = () => {
        const temp: ITargetList = {targets: [], total: 0}
        ServiceTargetList({source: 0, team_id: currentTeamId}).then(res => {
            if (res.em === "success") {
                temp.targets = res.data.targets.map((item: ITargetFolder) => (
                    {
                        ...item,
                        target_type: item.target_type === "folder" ? "folder" : "target"
                    }
                ))
                temp.total = res.data.total
            }
            setListData(temp)
        })
    }
    useEffect(() => {
        handleGetTargetList()
    }, []);

    const handleClickTarget = (target_id: string) => {
        setNow_target(target_id)
        ServiceTargetDetail({team_id:currentTeamId,target_ids: target_id}).then(res =>{
            if (res.em === "success") {
                const temp_target:ITargetSave = {
                    ...res.data.targets[0]
                }
                setDataList([...dataList, temp_target])
            }
        })
        console.log(now_target)
    }

    return (
        <div className={'left-right-structure'}>
            <div className={'env-left'}>
                <SubjectLeftComponent data={listData} onAdd={handleAddItem} onClick={handleClickTarget}/>
            </div>
            <div className={'env-right'}>
                {/*<SubjectRightComponent/>*/}
                <RightTagComponent data={dataList}/>
            </div>
        </div>
    )
}