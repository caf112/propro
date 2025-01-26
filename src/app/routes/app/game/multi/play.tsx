import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { MultiEditor } from "@/features/game/multi/code";

const MultiPlayRoute = () => {
    const navigate = useNavigate()

    const handleTopPage = () => {
        navigate(paths.top.path)
    }

    const handleStageSelector = () => {
        navigate(paths.game.single.stageSelector.getHref())
    }

  return (
    <div>
        <h1>MultiPlayRoute</h1>
            <div>
                <MultiEditor />
            </div>
        <button onClick={handleStageSelector}>ステージ選択へ</button>
        <button onClick={handleTopPage}>topへ</button>
    </div>
  )
}

export default MultiPlayRoute