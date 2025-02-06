import { paths } from "@/config/paths"
import { JoinRoom } from "@/features/recruit-member/join"
import { CreateRoom } from "@/features/recruit-member/recruit"
import { RecruitMember } from "@/features/recruit-member/room-stream"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const MatchingRoute = () => {
  const [mode, setMode] = useState("select")
  const navigate = useNavigate()
  const handleNavigate = (path: string) => {
    navigate(path)
  }


  const handleChangeState = (value: string) => {
    setMode(value)
  }

  
  return (
    <div>
      {/* 選択画面 */}
      {mode === "select" && (
        <div>
          <button onClick={() => handleChangeState("create")}>募集する</button>
          <button onClick={() => handleChangeState("join")}>参加する</button>
        </div>
      )}

      {/* 募集画面 */}
       {mode === "create" && (
        <div>
          <CreateRoom onChangeMode={handleChangeState} />
          <button onClick={() => handleChangeState("select")}>戻る</button>
        </div>
      )}
      
      {/* 参加画面 */}
      {mode === "join" && (
        <div>
          <JoinRoom onChangeMode={handleChangeState} />
          <button onClick={() => handleChangeState("select")}>戻る</button>
        </div>
      )}

      {/* メンバーリスト */}
      {mode === "memberList" &&(
        <div>
          <RecruitMember />
          <button onClick={() => handleChangeState("select")}>戻る</button>
        </div>
      )}
      <button onClick={() => handleNavigate(paths.top.path)}>topへ</button>
      
    </div>
  )
}

export default MatchingRoute