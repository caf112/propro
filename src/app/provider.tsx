import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react"
import { queryConfig } from "@/lib/react-query";
import { AuthLoader } from "@/lib/auth";

type AppProviderProps = {
    children: React.ReactNode;
}


export const AppProvider = ({children}: AppProviderProps) => {
    const [queryClient] = React.useState(
        () => 
            new QueryClient({
                defaultOptions: queryConfig,
            }),
    );

  return (
        <QueryClientProvider client={queryClient}>
            <AuthLoader>
                {children}
            </AuthLoader>
        </QueryClientProvider>
  )
}