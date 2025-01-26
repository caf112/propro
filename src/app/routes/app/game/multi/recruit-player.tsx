import { paths } from "@/config/paths"
import { RecruitMember } from "@/features/recruit-member/recruit"
import { useNavigate } from "react-router-dom"

const RecruitRoute = () => {
  const navigate = useNavigate()
  const handleNavigate = (path: string) => {
    navigate(path)
  }

  
  return (
    <div>
      
      <RecruitMember />
      <button onClick={() => handleNavigate(paths.top.path)}>topへ</button>
      
    </div>
  )
}

export default RecruitRoute