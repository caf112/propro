import { useState, useRef } from "react";
import { generateClient } from "aws-amplify/api";
import type { Schema } from '@/../../amplify/data/resource';
import { diffWords, Change } from "diff";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoom } from "./useRoom";
import { useAuth } from "./useAuth";

const client = generateClient<Schema>({
  authMode: 'userPool',
});

const currentCodeQueryKey = ["currentCode"];

export const useEditor = () => {
  const { room } = useRoom();
  const { data } = useAuth();
  const [codeHistory, setCodeHistory] = useState<{
    added: string;
    removed: string;
    timestamp: string;
  }[]>([]);

  const previousCode = useRef<string>("");
  const roomId = room?.id
  const queryClient = useQueryClient();

  // Recruitmentデータ取得
  const recruitmentQuery = useQuery({
    queryKey: ["recruitment"],
    queryFn: async () => {
      const { data: sessionItems } = await client.models.Recruitment.list({});
      return sessionItems || [];
    },
  });

  // RealTimeCodeデータ取得
  const codesQuery = useQuery({
    queryKey: ["codes"],
    queryFn: async () => {
      const { data: codeItems } = await client.models.RealTimeCode.list({});
      return codeItems || [];
    },
  });

  // 現在のコード（currentCode）の管理
  const currentCodeQuery = useQuery({
    queryKey: currentCodeQueryKey,
    queryFn: () => "",
    initialData: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>

</style>
<body>
    

    <script>

    </script>
</body>
</html>`,
  });

  const setCurrentCode = (newCode: string) => {
    queryClient.setQueryData(currentCodeQueryKey, newCode);
  };

  // 差分を計算
  const calculateDiff = (oldText: string, newText: string) => {
    const diffs: Change[] = diffWords(oldText, newText);

    let added = "";
    let removed = "";

    diffs.forEach((part: Change) => {
      if (part.added) added += part.value;
      if (part.removed) removed += part.value;
    });

    return { added, removed };
  };

  // コードを追加するミューテーション
  const addCodeMutation = useMutation({
    mutationFn: async (newCode: string) => {
      const { added, removed } = calculateDiff(previousCode.current, newCode);
      const timestamp = new Date().toLocaleString();

      setCodeHistory((prev) => [
        ...prev,
        { added, removed, timestamp },
      ]);

      previousCode.current = newCode;

      return client.models.RealTimeCode.create({
        id: roomId,
        content: [newCode],
        lastModiedBy: data?.name,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codes"] });
    },
  });

  // コードを追加
  const addCode = () => {
    const currentCode = queryClient.getQueryData<string>(currentCodeQueryKey);

    if (!currentCode?.trim()) {
      alert("コードを入力してください！");
      return;
    }

    addCodeMutation.mutate(currentCode);
  };


  const codeJudgeMutation = useMutation({
    mutationFn: async (judgeResults: boolean[]) => {
      return client.models.RealTimeCode.update({
        id: roomId,
        codeJudge: judgeResults,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codes"] });
    },
  });
  
  const codeJudge = (newJudgeResult: boolean) => {
    // 現在のcodeJudge配列を取得
    const currentCodes = queryClient.getQueryData<Schema["RealTimeCode"]["type"][]>(["codes"]) || [];
    const currentCode = currentCodes.find((code) => code.id === roomId);
    // console.log("room",room)
    // console.log("roomId",roomId)
    // console.log("codeJudge",codeJudge)
    // console.log("currentCodes",currentCodes)
    // console.log("currentCode",currentCode)
  
    if (!currentCode) {
      console.error("対象のコードが見つかりませんでした。");
      return;
    }
  
    // 現在のcodeJudge配列からnullを排除して新しい判定結果を追加
    const updatedJudgeResults = [
      ...(currentCode.codeJudge?.filter((value): value is boolean => value !== null) || []),
      newJudgeResult,
    ];
  
    // 更新を実行
    codeJudgeMutation.mutate(updatedJudgeResults);
  };
  

 

  return {
    recruitment: recruitmentQuery.data || [],
    codes: codesQuery.data || [],
    currentCode: currentCodeQuery.data || `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>

</style>
<body>
    

    <script>

    </script>
</body>
</html>`,
    codeHistory,
    setCurrentCode,
    addCode,
    codeJudge,
    isLoading: recruitmentQuery.isLoading || codesQuery.isLoading || currentCodeQuery.isLoading,
    error: recruitmentQuery.error || codesQuery.error,
  };
};
