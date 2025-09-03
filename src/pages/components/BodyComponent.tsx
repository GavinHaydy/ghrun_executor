import React, {useState} from "react";
import {Radio} from "antd";
import type {IBodyParameter} from "@/types/targets/bodyType.ts";
import {BodyFormUrlComponent} from "@/pages/components/body/formUrlComponent.tsx";

interface CookieComponentProps {
    onChange: (data: IBodyParameter[]) => void
}

export const BodyComponent: React.FC<CookieComponentProps> = ({onChange}) => {
    // const {t} = useTranslation()
    const [bodyType,setType] = useState<string>('none')

    return(
        <>
            <Radio.Group
                value={bodyType}
                options={[
                    {value: 'none', label: 'none'},
                    {value: 'data', label: 'form-data'},
                    {value: 'url', label: 'x-www-form-urlencoded'},
                    {value: 'raw', label: 'raw'},
                ]}
                onChange={(e) => {setType(e.target.value)}}
            />
            {bodyType === 'url'
                ? <BodyFormUrlComponent onChange={onChange}/>
                : bodyType === 'none'
                ? <div>该请求暂时没有正文</div>
                : <div>none</div>}
        </>
    )

};
