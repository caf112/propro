import { buttonStyle } from "@/components/ui/button/hoverButton";
import { useAuth } from "@/hooks/useAuth";
import { useRoom } from "@/hooks/useRoom"
import { useState } from "react";

export const CreateRoom = ( {
  onChangeMode,
  setRoomId
}: {
  onChangeMode:(mode: string) => void
  setRoomId: (roomId: string) => void
} ) => {
  const [password, setPassword] = useState("")
  const { createRoom } = useRoom();
  const { data } = useAuth()

  const username = data?.name || "unknown"
  
  const handleCreateRoom = async () => {
    if(!password) {
      setPassword("random")
    }
    try {
      const createdRoomId = await createRoom(password, username)
      if (createdRoomId) {
        setRoomId(createdRoomId)
        onChangeMode("host")
      } else {
        console.error("部屋の作成に失敗しました")
      }
    }catch (error) {
      console.error("エラーが発生しました", error)
    }
  }

  
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="あいことばを入力"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "200px"
          }}
        />
        <button
          onClick={handleCreateRoom}
          style={buttonStyle("#0056b3","#007bff")}
        >
          募集する
        </button>
      </div>
    </div>
  )
}
