import request, {Method} from "@/utils/request.ts";

const UPLOAD = `/file/v1/api/upload`

export const ServiceUpload = (data = {}) => {
    return request(
        UPLOAD,
        Method.POST,
        data,
        {'Content-Type': 'multipart/form-data'}
    )
}