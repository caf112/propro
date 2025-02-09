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
    const { joinRoom } = useRoom()
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
                onChangeMode("memberList")
            } else {
                console.error("部屋の参加に失敗しました")
            }
        } catch (error) {
            console.error("エラーが発生しました", error)
        }
    }
    
    
  return (
    <div>
        <input 
        type="text"
        placeholder="あいことばを入力"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleMemberListPage}>参加する</button>
    </div>
  )
}
