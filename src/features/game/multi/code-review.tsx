import { useEffect, useState } from "react";
import { useEditor } from "@/hooks/useEditor";
import { generateClient } from "aws-amplify/api";
import { Schema } from "amplify/data/resource";
import { useRoom } from "@/hooks/useRoom";

const client = generateClient<Schema>({
  authMode: "userPool",
});

export const CodeReview = () => {
  const { codes, isLoading, error, codeJudge, refetch } = useEditor();
  const [selectedJudgment, setSelectedJudgment] = useState<boolean | null>(null);
  const [percentages, setPercentages] = useState({ truePercentage: "0", falsePercentage: "0" })
  const [clickCheck, setClickCheck] = useState(false)
  const {storagesRoom} = useRoom()
  const stagesOdai = localStorage.getItem("stagesOdai")

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleJudgeUpdate = (judgment: boolean) => {
    setSelectedJudgment(judgment);
    codeJudge(judgment); 
    setClickCheck(true)
    refetch()
  };

  console.log(codes?.codeJudge)
  const calculatePercentages = () => {
    
    const allJudgments = codes?.codeJudge?.flatMap((judge: boolean | null) => judge !== null ? [judge] : []) ?? [];
    console.log("alljudge\n",allJudgments)
    const trueCount = allJudgments?.filter((judge) => judge === true).length;
    const falseCount = allJudgments?.filter((judge) => judge === false).length;
    const total = trueCount + falseCount;
    
    const truePercentage = total > 0 ? ((trueCount / total) * 100).toFixed(2) : "0";
    const falsePercentage = total > 0 ? ((falseCount / total) * 100).toFixed(2) : "0";

    setPercentages({ truePercentage, falsePercentage })
  };

  const roomId = storagesRoom?.id

  useEffect(() => {
    if (codes?.codeJudge) {
      const allJudgments = codes.codeJudge.flatMap((judge: boolean | null) =>
        judge !== null ? [judge] : []
      );
      const trueCount = allJudgments.filter((judge) => judge === true).length;
      const falseCount = allJudgments.filter((judge) => judge === false).length;
      const total = trueCount + falseCount;
  
      setPercentages({
        truePercentage: total > 0 ? ((trueCount / total) * 100).toFixed(2) : "0",
        falsePercentage: total > 0 ? ((falseCount / total) * 100).toFixed(2) : "0",
      });
    }
  }, [codes?.codeJudge])
 
  
  // stageSelectedを監視
  useEffect(() => {
    if (!roomId) return; 

    const sub = client.models.Room.observeQuery({
      // id=roomIdのみ監視する
      filter: { id: { eq: roomId } },
    }).subscribe({
      next: (result) => {
        if (result.items.length > 0) {
          const room = result.items[0];
          console.log("result.items[0]\n",room)
          if (room.stageSelected === true) {
            calculatePercentages()
          }
        }
      },
      error: (err) => {
        console.error("Error subscribing to room:", err);
      },
    });

    return () => sub.unsubscribe();
  }, [roomId]);
      
  

  console.log(clickCheck)
  console.log(percentages.truePercentage, percentages.falsePercentage)
  console.log(stagesOdai)

  return (
    <div>
      <h3>Code Review</h3>
      <p>お題：{stagesOdai}</p>
      <p>
        <strong>あなたの判定:</strong> {selectedJudgment === true ? "〇" : selectedJudgment === false ? "×" : "未選択"}
      </p>
      {!clickCheck ? (
          <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{
              backgroundColor: selectedJudgment === true ? "lightgreen" : "white",
            }}
            onClick={() => handleJudgeUpdate(true)}
            >
            〇
          </button>
          <button
            style={{
              backgroundColor: selectedJudgment === false ? "lightcoral" : "white",
            }}
            onClick={() => handleJudgeUpdate(false)}
            >
            ×
          </button>
      </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <p>
              <strong>〇（true）の割合:</strong> {percentages.truePercentage}%
            </p>
            <p>
              <strong>×（false）の割合:</strong> {percentages.falsePercentage}%
            </p>
            <button onClick={() => refetch()}>更新</button>
          </div>
      )}
    </div>
  );
};
