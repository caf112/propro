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
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()
  const {stageParam} = useStageParams()
  const {storagesRoom} = useRoom()
  const {
    currentCode,
    setCurrentCode,
    setCodeHistory,
    codeHistory,
    addCode,
    refetch,
  } = useEditor();
  const roomId = storagesRoom?.id
  
  const savedOdai = localStorage.getItem("stagesOdai")
  const paramOdai = odai.find(item => item.id === stageParam)?.text || "君たちに教えることはない。好きにしたまえ。"
  const stagesOdai = paramOdai ?? savedOdai
  localStorage.setItem("stagesOdai", stagesOdai)

  console.log("stageParam",stageParam)
  console.log("odai",odai)
  console.log("saved",savedOdai)
  console.log("default",paramOdai)
  console.log("localstorage",stagesOdai)


  // 3秒編集がない場合、編集中のフラグを解除
  useEffect(() => {
    if (isEditing) {
      const timeout = setTimeout(() => {
        setIsEditing(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  })

  // finichedEditとcontentを監視
    useEffect(() => {
      if (!roomId) return; 
  
      const sub = client.models.Room.observeQuery({
        // id=roomIdのみ監視する
        filter: { id: { eq: roomId } },
      }).subscribe({
        next: (result) => {
          if (result.items.length > 0) {
            const room = result.items[0];
            refetch()
            if (!isEditing && room.code?.content && room.code.content !== currentCode) {
              setCurrentCode(room.code.content)
            }
            if (room.code?.history) {
              const filteredHistory = room.code.history
            .filter((record) => record !== null) // null の除外
            .map((record) => ({
              added: record.added ?? "",
              removed: record.removed ?? "",
              editor: record.editor ?? "不明",
              timestamp: record.timestamp ?? "",
            }));
            setCodeHistory(filteredHistory);

            }
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
    }, [roomId, currentCode, isEditing]);


    // EditorのonChange処理
    const handleEditorChange = (value: string | undefined) => {
      setIsEditing(true)
      setCurrentCode(value || "")
    }
  

    // 誰かが提出したら自動でページ遷移
    useEffect(() => {
      if (finishedState === false) return
      navigate(paths.game.multi.result.getHref());
      
    }, [finishedState, navigate]);
  

  
  const handleResultPage = async () => {
    if (!roomId) return
    if (window.confirm("回答しますか？\n他のユーザーにも影響します")) {
      addCode()
      try {
        await client.models.Room.update({
          id: roomId,
          finishedEdit: true,
        })
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
            // onChange={(value) => setCurrentCode(value || "")}
            onChange={handleEditorChange}
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
