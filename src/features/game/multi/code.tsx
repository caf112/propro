import MonacoEditor from "@monaco-editor/react";
import { useEditor } from "@/hooks/useEditor";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { useStageParams } from "@/hooks/useStageParams";
import { odai } from "./datas/stages";
import { useEffect, useState } from "react";
import { useRoom } from "@/hooks/useRoom";
import { client } from "@/lib/schemes";

export const MultiEditor = () => {
  const [finishedState, setFinishedState] = useState(false)
  const navigate = useNavigate()
  const {stageParam} = useStageParams()
  const {storagesRoom} = useRoom()
  const {
    currentCode,
    setCurrentCode,
    codeHistory,
    addCode,
    refetch,
  } = useEditor();
  const roomId = storagesRoom?.id
  
  const savedOdai = localStorage.getItem("stagesOdai")
  const defaultOdai = odai.find(item => item.id === stageParam)?.text || "君たちに教えることはない。好きにしたまえ。"
  const stagesOdai = savedOdai || defaultOdai
  localStorage.setItem("stagesOdai", stagesOdai)

  // isRecruitingを監視
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
            refetch()
            if (room.finishedEdit === true) {
              setFinishedState(true);
            }
          }
        },
        error: (err) => {
          console.error("Error subscribing to room:", err);
        },
      });
  
      return () => sub.unsubscribe();
    }, [roomId]);
  
    // 提出したら自動でページ遷移
    useEffect(() => {
      console.log("useState\n",finishedState)
      if (finishedState === false) return
      navigate(paths.game.multi.result.getHref());
      
    }, [finishedState, navigate]);
  

  
  const handleResultPage = async () => {
    if (!roomId) return
    if (window.confirm("回答しますか？\n他のユーザーにも影響します")) {
      addCode()
      try {
        const result = await client.models.Room.update({
          id: roomId,
          finishedEdit: true,
        })
        console.log("Room Update result:\n", result)
        navigate(paths.game.multi.result.getHref())
      } catch (error) {
        console.error("Failed to update finishedEdit\n", error)
      }
    }
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
      <p>{stagesOdai}</p>
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
          commitする
        </button>
        <button
          onClick={handleResultPage}
          style={{ marginTop: "10px", marginLeft: "10px" }}
        >
          pushする
        </button>
      </div>

      <div style={{ flex: 1 }} className="history-container">
        <h3>commit履歴</h3>
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
                <strong>add:</strong>
                <span style={{ color: "green", whiteSpace: "pre-wrap" }}>
                  {record.added}
                </span>
              </div>
              <div>
                <strong>delete:</strong>
                <span style={{ color: "red", whiteSpace: "pre-wrap" }}>
                  {record.removed}
                </span>
              </div>
              <small>{record.timestamp} (編集者:{record.editor})</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
