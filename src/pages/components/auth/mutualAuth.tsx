import {Button, message, Upload, type UploadProps} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import type {RcFile} from "antd/es/upload";
import {ServiceUpload} from "@/api/common.ts";
import {useEffect, useState} from "react";
import type {IBidirectional} from "@/types/targets/authType.ts";

export const MutualAuthComponent = () => {
    const [msgApi, contextHolder] = message.useMessage()
    const [bidirectional, setBidirectional] = useState<IBidirectional>(
        {
            ca_cert: "",
            ca_cert_name: ""
        }
    );

    useEffect(() => {
        console.log(bidirectional)
    }, [bidirectional]);

    const customRequest: NonNullable<UploadProps['customRequest']> = async (options) => {
        const {file, onSuccess, onError} = options;

        const formData = new FormData();
        formData.append("file", file as RcFile);
        // console.log(file)

        try {
            const resp = await ServiceUpload(formData); // 调用你自己的上传接口
            onSuccess?.(resp, file); // 更新 Upload 内部状态
            console.log(resp)
            if (resp.code === 200 && resp.data) {
                setBidirectional({
                    ca_cert: resp.data[0].url,
                    ca_cert_name: resp.data[0].originalname
                })
            }
            msgApi.success(`${(file as RcFile).name} 上传成功`);
        } catch (err) {
            onError?.(err as Error);
            msgApi.error(`${(file as RcFile).name} 上传失败${err}`);
        }
    };

    return (
        <>
            {contextHolder}
            <Upload
                customRequest={customRequest} // 覆盖默认请求
                multiple
                maxCount={5}
                showUploadList
                // beforeUpload={() => false} // 阻止自动上传
            >
                <Button icon={<UploadOutlined/>}>Upload</Button>
            </Upload>
        </>

    );

}