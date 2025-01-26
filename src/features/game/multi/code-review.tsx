import { useState } from "react";
import { useEditor } from "@/hooks/useEditor";

export const CodeReview = () => {
  const { codes, isLoading, error, codeJudge } = useEditor();
  const [selectedJudgment, setSelectedJudgment] = useState<Record<string, boolean | null>>({});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleJudgeUpdate = (codeId: string | null, judgment: boolean) => {
    if (!codeId) return; // null チェックを追加
    setSelectedJudgment((prev) => ({
      ...prev,
      [codeId]: judgment,
    }));
  };

  const handleSave = (codeId: string | null) => {
    if (!codeId) return; // null チェックを追加
    const judgment = selectedJudgment[codeId];
    if (judgment !== undefined && judgment !== null) {
      codeJudge(judgment); // 更新処理を呼び出す
      alert(`Code ${codeId}を${judgment ? "〇" : "×"}に更新しました！`);
    }
  };

  const totalJudgments = codes.reduce(
    (acc, code) => {
      const judgments = code.codeJudge || [];
      judgments.forEach((judge) => {
        if (judge === true) acc.trueCount++;
        else if (judge === false) acc.falseCount++;
      });
      return acc;
    },
    { trueCount: 0, falseCount: 0 } // 初期値
  );

  const total = totalJudgments.trueCount + totalJudgments.falseCount;
  const truePercentage = total > 0 ? ((totalJudgments.trueCount / total) * 100).toFixed(2) : "0";
  const falsePercentage = total > 0 ? ((totalJudgments.falseCount / total) * 100).toFixed(2) : "0";
  

  return (
    <div>
      <h3>Code Review</h3>
      <ul>
        {codes.map((code) => (
          <li key={code.id || "null"} style={{ marginBottom: "20px" }}>
            <p><strong>CodeJudge:</strong></p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{
                  backgroundColor: selectedJudgment[code.id || "null"] === true ? "lightgreen" : "white",
                }}
                onClick={() => handleJudgeUpdate(code.id, true)}
              >
                〇
              </button>
              <button
                style={{
                  backgroundColor: selectedJudgment[code.id || "null"] === false ? "lightcoral" : "white",
                }}
                onClick={() => handleJudgeUpdate(code.id, false)}
              >
                ×
              </button>
              <button onClick={() => handleSave(code.id)} style={{ marginLeft: "10px" }}>
                回答する
              </button>
            </div>
            <p>
        <strong>〇（true）の割合:</strong> {truePercentage}%
      </p>
      <p>
        <strong>×（false）の割合:</strong> {falsePercentage}%
      </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
