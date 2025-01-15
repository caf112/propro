import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Button from '@/components/ui/button'
import { paths } from "@/config/paths"

const RecruitMemberRoute = () => {
  const navigate = useNavigate()
  const [players, setPlayers] = useState<string[]>([])
  const [playerName, setPlayerName] = useState<string>("")

  const handleStageSelectPage = () => {
    navigate(paths.game.multi.stageSelector.getHref())
  }

  const handleAddPlayer = () => {
    if (playerName.trim()) {
      setPlayers([...players, playerName])
      setPlayerName("")
    }
  }

  return (
    <div>
      <h1>RecruitMember</h1>
      <input 
        type="text" 
        value={playerName} 
        onChange={(e) => setPlayerName(e.target.value)} 
        placeholder="プレイヤー名を入力" 
      />
      <Button.ActionButton onClick={handleAddPlayer} label="追加" iconClass='add-player' />
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <Button.ActionButton onClick={handleStageSelectPage} label="ステージ選択へ" iconClass='single-mode' />
    </div>
  )
}

export default RecruitMemberRoute