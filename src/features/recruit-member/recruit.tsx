import { useAuth } from "@/hooks/useAuth";
import { useRoom } from "@/hooks/useRoom"
import { useState } from "react";

export const CreateRoom = ( {onChangeMode}: {onChangeMode:(mode: string) => void} ) => {
  const [password, setPassword] = useState("")
  const { createRoom } = useRoom();
  const { data } = useAuth()

  const username = data?.name || "unknown"
  
  const handleCreateRoom = () => {
    if(!password) {
      setPassword("random")
    }
    createRoom(password,username)
    onChangeMode("memberList")
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
