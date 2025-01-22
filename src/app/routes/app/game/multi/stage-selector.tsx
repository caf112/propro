import { paths } from "@/config/paths";
import { useNavigate } from "react-router-dom"
import { useCode } from "@/hooks/useCode";
// import * as Button from '@/components/ui/button'

const MultiStageSelectRoute = () => {

    const navigate = useNavigate();
    const { stages } = useCode()

    const handleStage = (stage: string) => {
      navigate(paths.game.single.play.getHref(stage))
  }

    const handleNavigate = (path: string) => {
      navigate(path)
    }
    
    
  return (
    <div>
        <h1>StageSelect</h1>
        <div>
          {stages.length > 0 ? (
            stages.map((stage, index) => (
              <button key={index} onClick={() => handleStage(String(stage.stageNumber))}>
                {`stage${stage.stageNumber}` || `Stage ${index + 1}`}
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

export default MultiStageSelectRoute