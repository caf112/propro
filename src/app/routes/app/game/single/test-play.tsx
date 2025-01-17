import TestGame from "@/features/game/test-game";
import { Loader } from "@/components/ui/loader";
import { useCode } from "@/hooks/useCode";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

const TestPlayRoute = () => {
    const { data, isLoading, error } = useCode();
    const navigate = useNavigate()
    // console.log("data", data);

    const handleTopPage = () => {
        navigate(paths.top.path)
    }

  return (
    <div>
        <h1>TestPlayRoute</h1>
        {isLoading ? (
            <Loader />
        ): data ? (
            <div>
                <TestGame /> 
            </div>
        ) : (
            // エラーページを作成する
            <div>
                <p>エラーが発生しました</p>
                <p>{error?.message}</p>
            </div>
        )
        }
        <button onClick={handleTopPage}>topへ</button>
    </div>
  )
}

export default TestPlayRoute