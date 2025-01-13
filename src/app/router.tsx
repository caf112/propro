import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { paths } from "@/config/paths"
import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react";


const convert = (queryClient: QueryClient) => (m: any) => {
    const { clientLoader, clientAction, default: Component, ...rest } = m;
    return {
        ...rest,
        loader: clientLoader?.(queryClient),
        action: clientAction?.(queryClient),
        Component,
    };
};

const createAppRouter = (queryClient: QueryClient) => 
     createBrowserRouter([
        {
            path: paths.Top.path,
            lazy: () => import("./routes/top").then(convert(queryClient)),
        },
        {
            path: paths.auth.Register.path,
            lazy: () => import("./routes/auth/register").then(convert(queryClient)),
        },
        {
            path: paths.auth.Login.path,
            lazy: () => import("./routes/auth/login").then(convert(queryClient)),
        },
        {
            path: paths.app.MyPage.path,
            lazy: () => import("./routes/app/mypage").then(convert(queryClient)),
        },
    ])

export const AppRouter = () => {
    
    const queryClient = useQueryClient();
    
    const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

    return <RouterProvider router={router} />;
}