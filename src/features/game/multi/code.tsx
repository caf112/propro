import { generateClient } from "aws-amplify/api";
import type { Schema } from '@/../../amplify/data/resource';
import { useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { diffWords, Change } from "diff";

const client = generateClient<Schema>({
  authMode: 'userPool',
});

export const MultiEditor = () => {
  const [recruitment, setRecruitment] = useState<Schema["Recruitment"]["type"][]>([]);
  const [codes, setCodes] = useState<Schema["RealTimeCode"]["type"][]>([]);
  const [currentCode, setCurrentCode] = useState<string>("");
  const [codeHistory, setCodeHistory] = useState<{
    added: string;
    removed: string;
    timestamp: string;
  }[]>([]);

  const previousCode = useRef<string>("");

  useEffect(() => {
    const fetchRecruitments = async () => {
      const { data: sessionItems } = await client.models.Recruitment.list({});
      setRecruitment(sessionItems || []);
    };

    const fetchCodes = async () => {
      const { data: codeItems } = await client.models.RealTimeCode.list({});
      setCodes(codeItems || []);
    };

    fetchRecruitments();
    fetchCodes();
  }, []);

  // 差分を計算し、追加と削除のみに限定して抽出
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

  // コードを追加する処理
  const handleAddCode = async () => {
    if (!currentCode.trim()) {
      alert("コードを入力してください！");
      return;
    }

    const { added, removed } = calculateDiff(previousCode.current, currentCode);
    const timestamp = new Date().toLocaleString();

    // 差分のみ履歴に保存
    setCodeHistory((prev) => [
      ...prev,
      { added, removed, timestamp },
    ]);

    // 現在のコードを次回の比較用に保持
    previousCode.current = currentCode;

    // 新しいコードをサーバーに送信
    await client.models.RealTimeCode.create({
      id: "ee6bbeab-3fd0-4266-b089-95b8f8e69883",
      content: [currentCode],
      language: "javascript",
      lastModiedBy: "currentUser",//data.nameから取得
    });
  };

  return (
    <div>
      <h2>RealTimeCode</h2>

      {/* Monaco Editor */}
      <div className="editor">
        <MonacoEditor
          height="400px"
          language="javascript"
          theme="vs-dark"
          value={currentCode}
          onChange={(value: string | undefined) => setCurrentCode(value || "")}
        />
      </div>

      {/* 回答ボタン */}
      <button onClick={handleAddCode} style={{ marginTop: "10px" }}>
        回答する
      </button>

      {/* 差分履歴 */}
      <div style={{ marginTop: "20px" }}>
        <h3>回答履歴（差分のみ）</h3>
        <ul>
          {codeHistory.map((record, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <div>
                <strong>追加:</strong>
                <span style={{ color: "green", whiteSpace: "pre-wrap" }}>
                  {record.added}
                </span>
              </div>
              <div>
                <strong>削除:</strong>
                <span style={{ color: "red", whiteSpace: "pre-wrap" }}>
                  {record.removed}
                </span>
              </div>
              <small>{record.timestamp}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

