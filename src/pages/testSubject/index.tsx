import {SubjectLeftComponent} from "@/pages/testSubject/SubjectLeftComponent.tsx";
import {useEffect, useState} from "react";
import type {ITargetFolder, ITargetList} from "@/types/targetType.ts";
import {useAuthInfo} from "@/hooks/useAuthInfo.ts";
import {ServiceTargetList} from "@/api/target.ts";
// import {SubjectRightComponent} from "@/pages/testSubject/SubjectRightComponent.tsx";
import {RightTagComponent} from "@/pages/testSubject/RightTagComponent.tsx";

export const TestSubjectPage = () => {
    const currentTeamId = useAuthInfo().teamId as string
    const [dataList, setDataList] = useState<ITargetList>({targets: [], total: 0})
    const [now_target, setNow_target] = useState<string>('')

    const handleAddItem = (item: ITargetFolder) => {
        setDataList(prevState => ({
            targets: [...prevState.targets, item],
            total: prevState.total + 1,
        }))
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
            setDataList(temp)
        })
    }
    useEffect(() => {
        handleGetTargetList()
    }, []);

    const handleClickTarget = (target_id: string) => {
        setNow_target(target_id)
        console.log(now_target)
    }

    return (
        <div className={'left-right-structure'}>
            <div className={'env-left'}>
                <SubjectLeftComponent data={dataList} onAdd={handleAddItem} onClick={handleClickTarget}/>
            </div>
            <div className={'env-right'}>
                {/*<SubjectRightComponent/>*/}
                <RightTagComponent data={dataList}/>
            </div>
        </div>
    )
}