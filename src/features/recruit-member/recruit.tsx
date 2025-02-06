import { paths } from "@/config/paths";
import { useAuth } from "@/hooks/useAuth";
import { useRoom } from "@/hooks/useRoom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RecruitMember = () => {
  const navigate = useNavigate()
  const { createRoom } = useRoom();
  const { data } = useAuth()
  const [password, setPassword] = useState("")

  const username = data?.name || "unknown"
  
  const handleCreateRoom = () => {
    createRoom(password,username)
    navigate(paths.game.awsTest.getHref())
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
