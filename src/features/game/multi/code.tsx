import MonacoEditor from "@monaco-editor/react";
import { useEditor } from "@/hooks/useEditor";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

export const MultiEditor = () => {
  const {
    currentCode,
    setCurrentCode,
    codeHistory,
    addCode,
  } = useEditor();

  const navigate = useNavigate()

  const handleResultPage = () => {
    addCode()
    navigate(paths.game.multi.result.getHref())
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <p>お題でも書いときますか</p>
        <div className="editor">
          <MonacoEditor
            height="400px"
            language="html"
            theme="vs-dark"
            value={currentCode}
            onChange={(value) => setCurrentCode(value || "")}
          />
        </div>
        <button onClick={addCode} style={{ marginTop: "10px" }}>
          次のユーザーに託す
        </button>
        <button
          onClick={handleResultPage}
          style={{ marginTop: "10px", marginLeft: "10px" }}
        >
          回答する
        </button>
      </div>

      <div style={{ flex: 1 }} className="history-container">
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
