import { paths } from "@/config/paths"
import { useNavigate } from "react-router-dom"

const RecruitPlayer = () => {
  const navigate = useNavigate()
  const handleNavigate = (path: string) => {
    navigate(path)
  }
  
  return (
    <div>
      <h1>RecruitPlayer</h1>
      <button onClick={() => handleNavigate(paths.game.multi.stageSelector.getHref())}>メンバーを締め切る</button>
      <button onClick={() => handleNavigate(paths.top.path)}>topへ</button>
      
    </div>
  )
}

export default RecruitPlayer