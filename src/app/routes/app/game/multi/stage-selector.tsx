import { paths } from "@/config/paths";
import { useNavigate } from "react-router-dom"

const MultiStageSelectRoute = () => {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
      navigate(path)
    }
    
    
  return (
    <div>
        <h1>StageSelect</h1>
        <div>
          お題を選択したい
          ランダムも選択肢に入れる
        </div>
        <div>
          <button onClick={() => handleNavigate(paths.game.multi.play.getHref())}>プレイ</button>
          <button onClick={() => handleNavigate(paths.top.path)}>topへ</button>
        </div>

    </div>
  )
}

export default MultiStageSelectRoute