// router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { GlobalLayout } from "@/layouts/DefaultLayout.tsx";
import { ErrorPage } from "@/pages/error/errorPage";
import {ProtectedRoute} from "@/router/ProtectedRoute.ts";
import {HomePage} from "@/pages/homePages";
import {MachinePage} from "@/pages/machine";
import {EnvManagementPage} from "@/pages/env";

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
        children: [
            {
                index: true,
                element: <Navigate to="/home" />,
            },
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "env",
                element: <EnvManagementPage/>
            },
            {
              path: "machine",
              element: <MachinePage />,
            },
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
        ],
    },
    {
        path: "*",
        element: <Navigate to="/error" replace />,
    },
]);
