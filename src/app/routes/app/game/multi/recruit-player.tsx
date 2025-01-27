import { paths } from "@/config/paths"
import { RecruitMember } from "@/features/recruit-member/recruit"
import { useRoom } from "@/hooks/useRoom"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const RecruitRoute = () => {
  const navigate = useNavigate()
  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const {isRecruiting} = useRoom()

  useEffect(() => {
    if (isRecruiting === false) {
      navigate(paths.game.multi.stageSelector.getHref())
    }
  }, [isRecruiting, navigate])
  
  return (
    <div>
      {isRecruiting === true && <RecruitMember />}      
      <button onClick={() => handleNavigate(paths.top.path)}>topへ</button>
      
    </div>
  )
}

export default RecruitRoute