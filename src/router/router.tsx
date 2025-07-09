// router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { GlobalLayout } from "@/layouts/DefaultLayout.tsx";
import { ErrorPage } from "@/pages/error/errorPage";
import type {ReactNode} from "react";
import {useAuthInfo} from "@/hooks/useAuthInfo.ts";

// 路由守卫组件
const ProtectedRoute = ({ children }: { children: ReactNode }) => {

    const {token} = useAuthInfo();
    console.log(token)
    if (!token) {
        // return <Navigate to="/login" replace />;
        window.location.href = "http://localhost:5173/login";
        return null;
    }
    return children;
};

export const router = createBrowserRouter([
    {
        path: "/error",
        element: <ErrorPage />,
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <GlobalLayout />
            </ProtectedRoute>
        ),
        // children: [
        //     {
        //         index: true,
        //         element: <Navigate to="/work" />,
        //     },
        //     {
        //         path: "work",
        //         element: <WorkPage />,
        //     },
        //     {
        //         path: "member",
        //         element: <MemberPage />,
        //     },
        //     {
        //         path: "role",
        //         element: <RolePage />,
        //     },
        //     {
        //         path: "*",
        //         element: <Navigate to="/error" replace />,
        //     },
        // ],
    },
    {
        path: "*",
        element: <Navigate to="/error" replace />,
    },
]);
