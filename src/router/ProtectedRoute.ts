// 路由守卫组件
import {useAuthInfo} from "@/hooks/useAuthInfo.ts";
import type {ReactNode} from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {

    const {token} = useAuthInfo();
    console.log(token)
    if (!token) {
        // return <Navigate to="/login" replace />;
        window.location.href = "http://localhost:5173/login";
        return null;
    }
    return children;
};