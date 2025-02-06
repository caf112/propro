import { useAuth } from "@/hooks/useAuth"
import { useRoom } from "@/hooks/useRoom"
import { useState } from "react"

export const JoinRoom = ({ onChangeMode }: {onChangeMode: (mode: string) => void}) => {
    const [password, setPassword] = useState("")
    const { joinRoom } = useRoom()
    const {data} = useAuth()

    const username = data?.name || "unknown"

    const handleMemberListPage = () => {
        if (!password) {
            setPassword("random")
        }
        joinRoom(password,username)
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
      <button onClick={handleMemberListPage}>参加する</button>
    </div>
  )
}
