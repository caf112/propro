import { CodeGame } from "@/features/game/game";
import { Loader } from "@/components/ui/loader";
import { useCode } from "@/hooks/useCode";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

const MultiPlayRoute = () => {
    const { data, isLoading, error } = useCode();
    const navigate = useNavigate()
    // console.log("data", data);

    const handleTopPage = () => {
        navigate(paths.top.path)
    }

    const handleStageSelector = () => {
        navigate(paths.game.single.stageSelector.getHref())
    }

  return (
    <div>
        <h1>MultiPlayRoute</h1>
        {isLoading ? (
            <Loader />
        ): data ? (
            <div>
                <CodeGame /> 
            </div>
        ) : (
            // エラーページを作成する
            <div>
                <p>エラーが発生しました</p>
                <p>{error?.message}</p>
            </div>
        )
        }
        <button onClick={handleStageSelector}>ステージ選択へ</button>
        <button onClick={handleTopPage}>topへ</button>
    </div>
  )
}

export default MultiPlayRoute