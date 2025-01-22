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
            path: paths.admin.path,
            lazy: () =>
                import('./routes/common/stage-create').then(
                    convert(queryClient),
                )
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
                
                // シングルモード
                {
                    path: paths.game.single.stageSelector.path,
                    lazy: () => 
                        import('./routes/app/game/single/stage-selector').then(
                            convert(queryClient),
                        ),
                },
                {
                    path: paths.game.single.play.path,
                    lazy: () => 
                        import('./routes/app/game/single/play').then(
                        convert(queryClient),
                    ),
                },
                {
                    path: paths.game.single.result.path,
                    lazy: () => 
                        import('./routes/app/game/single/result').then(
                            convert(queryClient),
                    ),
                },

                
                // マルチモード
                {
                    path: paths.game.multi.recruit.path,
                    lazy: () =>
                        import('./routes/app/game/multi/recruit-player').then(
                            convert(queryClient),
                        ),  
                },
                {
                    path: paths.game.multi.stageSelector.path,
                    lazy: () => 
                        import('./routes/app/game/multi/stage-selector').then(
                            convert(queryClient),
                        ),
                },
                {
                    path: paths.game.multi.play.path,
                    lazy: () => 
                        import('./routes/app/game/multi/play').then(
                        convert(queryClient),
                    ),
                },
                {
                    path: paths.game.multi.result.path,
                    lazy: () => 
                        import('./routes/app/game/multi/result').then(
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
            lazy: () => import('./routes/common/not-found').then(
                convert(queryClient)
            )
        }
    ])

export const AppRouter = () => {
    
    const queryClient = useQueryClient();
    
    const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

    return <RouterProvider router={router} />;
}