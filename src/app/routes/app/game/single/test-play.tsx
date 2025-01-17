import TestGame from "@/features/game/test-game";
import { Loader } from "@/components/ui/loader";
import { useCode } from "@/hooks/useCode";

const TestPlayRoute = () => {
    const { data, isLoading, error } = useCode();
    console.log("data", data);

  return (
    <div>
        <h1>TestPlayRoute</h1>
        {isLoading ? (
            <Loader />
        ) : error ? (
            // エラーページを作成する
            <div>
                <p>エラーが発生しました</p>
                <p>{error.message}</p>
            </div>
        ): (
            <div>
                <TestGame />
            </div>
        )}
    </div>
  )
}

export default TestPlayRoute