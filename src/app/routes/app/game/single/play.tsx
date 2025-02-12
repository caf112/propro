import { CodeGame } from "@/features/game/single/game";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

const SinglePlayRoute = () => {
    // const { isLoading, error } = useStage();
    // if (isLoading) return <Loader />
    // if (error) return <p>Error: {error.message}</p>
    
    const navigate = useNavigate()

    const handleTopPage = () => {
        navigate(paths.top.path)
    }

    const handleStageSelector = () => {
        navigate(paths.game.single.stageSelector.getHref())
    }

  return (
    <div>
        <CodeGame />
        <button onClick={handleStageSelector}>ステージ選択へ</button>
        <button onClick={handleTopPage}>topへ</button>
    </div>
  )
}

export default SinglePlayRoute