import { useState } from "react";
import { useEditor } from "@/hooks/useEditor";

export const CodeReview = () => {
  const { codes, isLoading, error, codeJudge } = useEditor();
  const [selectedJudgment, setSelectedJudgment] = useState<boolean | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleJudgeUpdate = (judgment: boolean) => {
    setSelectedJudgment(judgment);
    codeJudge(judgment); 
  };

  const calculatePercentages = () => {

    const allJudgments = codes?.code?.codeJudge?.flatMap((judge: boolean | null) => judge !== null ? [judge] : []) ?? [];
    const trueCount = allJudgments?.filter((judge) => judge === true).length;
    const falseCount = allJudgments?.filter((judge) => judge === false).length;
    const total = trueCount + falseCount;

    const truePercentage = total > 0 ? ((trueCount / total) * 100).toFixed(2) : "0";
    const falsePercentage = total > 0 ? ((falseCount / total) * 100).toFixed(2) : "0";

    return { truePercentage, falsePercentage };
  };

  const { truePercentage, falsePercentage } = calculatePercentages();

  return (
    <div>
      <h3>Code Review</h3>
      <p>
        <strong>現在の判定:</strong> {selectedJudgment === true ? "〇" : selectedJudgment === false ? "×" : "未選択"}
      </p>
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
      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>〇（true）の割合:</strong> {truePercentage}%
        </p>
        <p>
          <strong>×（false）の割合:</strong> {falsePercentage}%
        </p>
      </div>
    </div>
  );
};
