import { useAuth } from "@/hooks/useAuth";
import { useRoom } from "@/hooks/useRoom"
import { useState } from "react";

export const CreateRoom = ( {
  onChangeMode,
  setRoomId
}: {
  onChangeMode:(mode: string) => void
  setRoomId: (roomId: number) => void
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
        onChangeMode("memberList")
      } else {
        console.error("部屋の作成に失敗しました")
      }
    }catch (error) {
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
      <button onClick={handleCreateRoom}>募集する</button>
    </div>
  )
}
