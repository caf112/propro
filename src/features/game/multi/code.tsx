import MonacoEditor from "@monaco-editor/react";
import { useEditor } from "@/hooks/useEditor";

export const MultiEditor = () => {
  const {
    currentCode,
    setCurrentCode,
    codeHistory,
    addCode,
  } = useEditor();

  return (
    <div>
      <h2>RealTimeCode</h2>
      <div className="editor">
        <MonacoEditor
          height="400px"
          language="javascript"
          theme="vs-dark"
          value={currentCode}
          onChange={(value) => setCurrentCode(value || "")}
        />
      </div>
      <button onClick={addCode} style={{ marginTop: "10px" }}>
        回答する
      </button>
      <div style={{ marginTop: "20px" }}>
        <h3>回答履歴（差分のみ）</h3>
        <ul>
          {codeHistory.map((record, index) => (
            <li key={index} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
              <div>
                <strong>追加:</strong>
                <span style={{ color: "green", whiteSpace: "pre-wrap" }}>{record.added}</span>
              </div>
              <div>
                <strong>削除:</strong>
                <span style={{ color: "red", whiteSpace: "pre-wrap" }}>{record.removed}</span>
              </div>
              <small>{record.timestamp}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
