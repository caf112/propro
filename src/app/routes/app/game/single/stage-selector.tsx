import { Loader } from "@/components/ui/loader";
import { paths } from "@/config/paths";
import { useStage } from "@/hooks/useStage"; 
import { useNavigate } from "react-router-dom"


const SingleStageSelectRoute = () => {

    const navigate = useNavigate();

    const { stages, isLoading} = useStage()
    // console.log(stages)

    if (isLoading) return <Loader />
    // if (error) return <p>Error: {error.message}</p>

    
    //buttonの処理
    const handleStage = (stage: string) => {
        navigate(paths.game.single.play.getHref(stage))
    }
    const handleNavigate = (path: string) => {
      navigate(path)
    }

    //stagesを昇順に並び替え
    const sortedStages = [...stages].sort((a, b) => {
      const stageNumberA = a.id ?? Number.MAX_VALUE; 
      const stageNumberB = b.id ?? Number.MAX_VALUE; 
      return stageNumberA - stageNumberB;
  });
    
  return (
    <div>
        <h1>ステージ選択</h1>
        <div>
          {stages.length > 0 ? (
            sortedStages.map((stage, index) => (
              <button key={index} onClick={() => handleStage(String(stage.id))}>
                {`stage${stage.id}` || `Stage ${index + 1}`}
              </button>
            ))
          ) : (
            <p>Loading stages...</p>
          )}
        </div>
        <div>
          <button onClick={() => handleNavigate(paths.top.path)}>topへ</button>
        </div>
    </div>
  )
}

export default SingleStageSelectRoute