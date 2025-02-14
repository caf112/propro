import { Loader } from "@/components/ui/loader"
import { useAuth } from "@/hooks/useAuth"
import { useRoom } from "@/hooks/useRoom"
import { useState } from "react"

export const JoinRoom = ({ 
    onChangeMode,
    setRoomId
}: {
    onChangeMode: (mode: string) => void
    setRoomId: (roomId: string) => void
}) => {
    const [password, setPassword] = useState("")
    const [roomNotFound, setRoomNotFound] = useState(false)
    const { joinRoom, isLoading, error } = useRoom()
    const {data} = useAuth()

    const username = data?.name || "unknown"

    const handleMemberListPage = async () => {
        if (!password) {
            setPassword("random")
        }
        try {
            const joinedRoomId = await joinRoom(password, username)
            if (joinedRoomId) {
                setRoomId(joinedRoomId)
                onChangeMode("member")
                setRoomNotFound(false)
            } else {
                console.error("部屋の参加に失敗しました", error)
                setRoomNotFound(true)
            }
        } catch (error) {
            console.error("エラーが発生しました", error)
            setRoomNotFound(true)
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
        />
      {isLoading && <Loader />}
      {roomNotFound && <p>部屋がありません</p>}
      <button onClick={handleMemberListPage}
      style={{
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "8px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer",
        transition: "0.3s"
    }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
      >参加する</button>
    </div>
    </div>
  )
}
