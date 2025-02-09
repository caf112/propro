import { useState, useRef } from "react";
import { diffWords, Change } from "diff";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/schemes";
import { useRoom } from "./useRoom";
import { useAuth } from "./useAuth";
import { UUID } from "@/utils/uuid";


const currentCodeQueryKey = ["currentCode"];

export const useEditor = () => {
  const { storagesRoom } = useRoom();
  const { data } = useAuth();
  const [codeHistory, setCodeHistory] = useState<{
    added: string;
    removed: string;
    timestamp: string;
  }[]>([]);

  const previousCode = useRef<string>("");
  const roomId = storagesRoom?.id || ""
  const queryClient = useQueryClient();


  // Codeを取得
  const codesQuery = useQuery({
    queryKey: ["codes", roomId],
    queryFn: async () => {
      const { data: roomItems, errors } = await client.models.Room.get({
        id: roomId
      });
      const codeItems = roomItems?.code
      if (errors) {
        throw new Error(`codes の errorです\n ${errors}`)
      }
      if (!codeItems) {
        return null
      } 
      return codeItems || {}
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

      const previousContent = storagesRoom?.code?.content || []

      
      return client.models.Room.update({
        id: roomId,
        code:{
          id: UUID(),
          room_id: roomId,
          content: [...previousContent, newCode],
          lastModifiedBy: data?.name,
          codeJudge: [],
        }
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
      return client.models.Room.update({
        id: roomId,
        code:{
          id: UUID(),
          room_id: roomId,
          codeJudge: judgeResults,
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["judge"] });
    },
  });
  
  const codeJudge = (newJudgeResult: boolean) => {
    // 現在のcodeJudge配列を取得
    const currentJudges = storagesRoom?.code?.codeJudge
    // console.log("room",room)
    // console.log("roomId",roomId)
    // console.log("codeJudge",codeJudge)
    // console.log("currentCodes",currentCodes)
    // console.log("currentCode",currentCode)
  
    console.log("codeJudgeのcurrentRoom\n",storagesRoom)
    if (!storagesRoom) {
      console.error("対象のコードが見つかりませんでした。");
      return;
    }
  
    // 現在のcodeJudge配列からnullを排除して新しい判定結果を追加
    const updatedJudgeResults = [
      ...(currentJudges?.filter((value): value is boolean => value !== null) || []),
      newJudgeResult,
    ];

  
    // 更新を実行
    codeJudgeMutation.mutate(updatedJudgeResults);
  };
  

 

  return {
    codes: codesQuery.data,
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
    refetch: codesQuery.refetch,
    isLoading: codesQuery.isLoading || currentCodeQuery.isLoading,
    error: codesQuery.error,
  };
};
