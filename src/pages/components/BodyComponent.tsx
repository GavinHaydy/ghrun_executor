import React, {useState} from "react";
import {Radio} from "antd";
import type {IBodyParameter} from "@/types/targets/bodyType.ts";
import {BodyFormUrlComponent} from "@/pages/components/body/formUrlComponent.tsx";
import {BodyDataComponent} from "@/pages/components/body/formDataComponent.tsx";
import {RawComponent} from "@/pages/components/body/rawComponent.tsx";

interface CookieComponentProps {
    onChange: (data: IBodyParameter[]) => void
}

export const BodyComponent: React.FC<CookieComponentProps> = ({onChange}) => {
    // const {t} = useTranslation()
    const [bodyType, setType] = useState<string>('none')
    const mapType =
        {
            "none": <div>none</div>,
            "data": <BodyDataComponent onChange={onChange}/>,
            "url": <BodyFormUrlComponent onChange={onChange}/>,
            "raw": <RawComponent/>
        }


    return (
        <>
            <Radio.Group
                value={bodyType}
                options={[
                    {value: 'none', label: 'none'},
                    {value: 'data', label: 'form-data'},
                    {value: 'url', label: 'x-www-form-urlencoded'},
                    {value: 'raw', label: 'raw'},
                ]}
                onChange={(e) => {
                    setType(e.target.value)
                }}
            />
            {Object.entries(mapType).map(([key,val]) => {
                if (key === bodyType){
                    return (
                        <div key={key}>
                            {val}
                        </div>
                    )
                }
            })}
        </>
    )

};
