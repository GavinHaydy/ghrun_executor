import React from 'react';
import {Divider, Dropdown, type MenuProps, Tabs} from 'antd';
import {IconFont} from "@/pages/components/IconFont.ts";
import type { ITargetList} from "@/types/targetType.ts";
import {SubjectRightComponent} from "@/pages/testSubject/SubjectRightComponent.tsx";
import {SubjectHeaderComponent} from "@/pages/testSubject/SubjectHeaderComponent.tsx";


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
    data: ITargetList
}


export const RightTagComponent: React.FC<RightTagProps> = ({data}) => {

    // const [items, setItems] = useState<ITargetFolder[]>([]);
    console.log(data.targets)

    return (
        <>
            { data.total > 0 && (
                <>
                    <Tabs tabBarExtraContent={operations}
                          items={data.targets.map(t => ({
                              key: t.key,
                              label: t.name,
                              children: (
                                  <>
                                      <SubjectHeaderComponent data={t}/>
                                      <SubjectRightComponent/>
                                  </>

                              )
                          }))}
                    />
                    <Divider/>
                </>
            )}
            {/*{items.length > 0 && (*/}
            {/*    <>*/}
            {/*        <Tabs tabBarExtraContent={operations} items={items} onChange={(e) => {*/}
            {/*            console.log(e)*/}
            {/*        }}/>*/}
            {/*        <Divider/>*/}
            {/*    </>*/}

            {/*)}*/}

        </>
    );
};

