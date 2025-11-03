import React, {useState} from 'react';
import {Divider, Dropdown, type MenuProps, Tabs} from 'antd';
import {IconFont} from "@/pages/components/IconFont.ts";
import type { ITargetSave} from "@/types/targetType.ts";
import {SubjectRightComponent} from "@/pages/testSubject/SubjectRightComponent.tsx";
import {SubjectHeaderComponent} from "@/pages/testSubject/SubjectHeaderComponent.tsx";
import type {IRespAPIDetail} from "@/types/resp/targetResp.ts";


// const handleCloseAllTags = () => {
//
// }

const menus: MenuProps['items'] = [
    {
        key: 'closeAllTags',
        label: (<div>关闭所有标签</div>)
    },
    {
        key: 'forceCloseAllTags',
        label: (<div>强制关闭所有标签</div>)
    },
    {
        key: 'closeOtherTags',
        label: (<div>关闭其他标签</div>)
    },
    {
        key: 'forceCloseOtherTags',
        label: (<div>强制关闭其他标签</div>)
    }
]
const operations = <Dropdown menu={{items:menus}} trigger={['click']}>
    <IconFont  style={{marginLeft: "10px"}} type={"icon-more"}/>
</Dropdown>

interface RightTagProps{
    data: (ITargetSave|IRespAPIDetail)[]
}


export const RightTagComponent: React.FC<RightTagProps> = ({data}) => {

    console.log(data)
    // const [items, setItems] = useState<ITargetFolder[]>([]);
    // console.log(data.targets)
    const [targetSavePayload, setTargetSavePayload] = useState<ITargetSave>({} as ITargetSave);

    const handlePayloadChange = (data:ITargetSave) => {
        console.log(data)
        setTargetSavePayload(data)
    }

    return (
        <>
            { data.length > 0 && (
                <>
                    <Tabs tabBarExtraContent={operations}
                          items={data.map(t => ({
                              key: t.target_id,
                              label: t.name,
                              children: (
                                  <>
                                      <SubjectHeaderComponent data={targetSavePayload} onChange={handlePayloadChange}/>
                                      <SubjectRightComponent onChange={handlePayloadChange}/>
                                  </>

                              )
                          }))}
                    />
                    <Divider/>
                </>
            )}

        </>
    );
};

