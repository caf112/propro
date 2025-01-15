import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { paths } from "@/config/paths"
import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react";
import { ProtectedRoute } from "@/lib/auth";
import GameRoot from "./routes/app/game/root";
import MyPageRoot from "./routes/app/mypage/root";


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
            path: paths.top.path,
            lazy: () => import("./routes/top").then(convert(queryClient)),
        },
        {
            path: paths.auth.register.path,
            lazy: () => import("./routes/auth/register").then(convert(queryClient)),
        },
        {
            path: paths.auth.login.path,
            lazy: () => import("./routes/auth/login").then(convert(queryClient)),
        },
        {
            path: paths.game.root.path,
            element: (
                <ProtectedRoute>
                    <GameRoot />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: paths.game.modeSelector.path,
                    lazy: () => 
                        import('./routes/app/game/mode-selector').then(
                            convert(queryClient),
                        ),
                },
                {
                    path: paths.game.single.stageSelector.path,
                    lazy: () => 
                        import('./routes/app/game/single/single-stage-selector').then(
                            convert(queryClient),
                        ),
                },
                {
                    path: paths.game.multi.stageSelector.path,
                    lazy: () => 
                        import('./routes/app/game/multi/multi-stage-selector').then(
                            convert(queryClient),
                        ),
                },
                {
                    path: paths.game.single.stageSelector.play.path,
                    lazy: () => 
                        import('./routes/app/game/single/single-play').then(
                        convert(queryClient),
                    ),
                },
                {
                    path: paths.game.multi.stageSelector.play.path,
                    lazy: () => 
                        import('./routes/app/game/multi/multi-play').then(
                        convert(queryClient),
                    ),
                },
                {
                    path: paths.game.result.path,
                    lazy: () => 
                        import('./routes/app/game/result').then(
                            convert(queryClient),
                    ),
                },
            ]
        },
        {
            path: paths.mypage.root.path,
            element: (
                <ProtectedRoute >
                    <MyPageRoot />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: paths.mypage.profile.path,
                    lazy: () => 
                        import('./routes/app/mypage/profile').then(
                            convert(queryClient)
                        ),
                },
            ]
        },
        {
            path: '*',
            lazy: () => import('./routes/not-found').then(
                convert(queryClient)
            )
        }
    ])

export const AppRouter = () => {
    
    const queryClient = useQueryClient();
    
    const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

    return <RouterProvider router={router} />;
}