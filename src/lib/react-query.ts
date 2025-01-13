import { DefaultOptions } from "@tanstack/react-query";

export const queryConfig = {
    queries: {
        refetchOnWindowFocus: false,//リアルタイム性が必要な場合、trueへ（デフォルト：0）
        retry: false,//クエリが失敗した際にリトライ（デフォルト：3回）
        staleTime: 1000 * 60,//フェッチしたデータが古いと判断される時間（デフォルト：0）
    },
} satisfies DefaultOptions;