// 路由守卫组件
import type {ReactNode} from "react";
import Cookies from "js-cookie";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {

    const token = Cookies.get("token")||localStorage.getItem("token")
    if (!token) {
        // return <Navigate to="/login" replace />;
        window.location.href = "/exe/login";
        return null;
    }
    return children;
};