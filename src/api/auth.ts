import request, {Method} from "@/utils/request.ts";

const Logout = "/permission/api/v1/auth/user_logout"

export const logoutService = () => {
    return request(
        Logout,
        Method.DELETE,
    )
}