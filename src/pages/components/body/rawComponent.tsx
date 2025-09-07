import {Input, Select} from "antd";
import React, {useState} from "react";
import format from 'xml-formatter';


export const RawComponent:React.FC = () =>{
    const [value, setValue] = useState<string>('');
    const [type, setType] = useState<string>('json');
    const handleMH = () => {
        // 使用 try-catch 来处理非法的 JSON，防止应用崩溃
        if (type === "json"){
            try {
                const p = JSON.stringify(JSON.parse(value), null, 2);
                setValue(p);
            } catch (e) {
                console.error("无效的 JSON:", e);
                // 可以在这里给用户一些提示，比如弹窗或者在输入框显示错误信息
            }
        }
        if (type === "xml" || type === "html"){
            try {
                const formattedXml = format(value, {
                    indentation: '\t', // 2个空格缩进
                    lineSeparator: '\n' // 换行符
                });
                setValue(formattedXml);
            } catch (e) {
                // 如果XML无效，会抛出错误
                console.log(`输入的 XML 格式不正确，请检查${e}`)
                // message.error('输入的 XML 格式不正确，请检查');
                // setXmlOutput('错误: ' + (e as Error).message);
            }
        }

    };


    const options = [
        {value: "json", label: "JSON"},
        {value: "xml", label: "XML"},
        {value: "html", label: "HTML"}
    ]
    return (
        <>
            <Select options={options} value={type} onChange={e=>{setType(e)}}></Select>
            <div onClick={handleMH}>美化</div>
            <Input.TextArea
                value={value}
                onChange={(e) => {setValue(e.target.value)}}
            />
        </>

    )
}