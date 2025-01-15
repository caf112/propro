import { useNavigate } from "react-router-dom"
import * as Button from '@/components/ui/button'
import { paths } from "@/config/paths"

const RecruitMemberRoute = () => {
  const navigate = useNavigate()

  const handleStageSelectPage = () => {
    navigate(paths.game.multi.stageSelector.getHref())
  }

  return (
    <div>
      <h1>RecruitMember</h1>
      <Button.ActionButton onClick={handleStageSelectPage} label="ステージ選択へ" iconClass='single-mode' />
    </div>
  )
}

export default RecruitMemberRoute