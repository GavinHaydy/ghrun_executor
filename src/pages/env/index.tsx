import "./index.less"
import {EnvLeftComponent, type EnvLeftComponentProps} from "@/pages/env/EnvLeftComponent.tsx";
import {useEffect, useState} from "react";
import type {IEnv, IEnvSearchByName} from "@/types/envType.ts";
import {ServiceEnvList} from "@/api/env.ts";
import {useAuthInfo} from "@/hooks/useAuthInfo.ts";


export const EnvManagementPage = () =>{
    const currentTeamId = useAuthInfo().teamId as string
    const [searchPayload, setSearchPayload] = useState<IEnvSearchByName>({team_id: currentTeamId, name: ''});
    const [data, setData] = useState<IEnv[]>([])

    const handleEnvList = () => {
        ServiceEnvList(searchPayload).then(res => {
            const temp: IEnv[] = []
            if (res.em === "success" && res.data.length > 0){
                temp.push(...res.data)
            }
            setData(temp)
        })
    }
    useEffect(() => {
        handleEnvList()
    }, [searchPayload]);
    const handleSearchByName:EnvLeftComponentProps['onParamsChange'] = (payload) => {
        setSearchPayload({team_id: currentTeamId, name: payload.name})
    }


    return (
        <div className={'left-right-structure'}>
            <div className={"env-left"}>
                <EnvLeftComponent data={data} onParamsChange={handleSearchByName}/>
            </div>
            <div className={'env-right'}>right</div>
        </div>
    // <div style={{
    //     display: 'flex',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: '100%',
    // }}>
    //     <div style={{width: '20%', height: '100%', backgroundColor: 'red'}}>left</div>
    //         <div style={{width: '78%', height: '50px', backgroundColor: 'yellow'}}>right</div>
    //     </div>
    )
}