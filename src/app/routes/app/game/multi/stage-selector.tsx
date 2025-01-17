import { paths } from "@/config/paths";
import { useModeParams } from "@/hooks/useGameParams";
import { useNavigate } from "react-router-dom"
// import * as Button from '@/components/ui/button'

const MultiStageSelectRoute = () => {

    const navigate = useNavigate();

    const selectTestStage = (stage: string) => {
        navigate(paths.game.single.play.getHref(stage))
    }

    const mode = useModeParams()
    console.log(mode)
    
    
  return (
    <div>
        <h1>StageSelect</h1>
        <div>
          <button onClick={() => selectTestStage('1')}>test-stage1</button>
          <button onClick={() => selectTestStage('2')}>test-stage2</button>
          <button onClick={() => selectTestStage('3')}>test-stage3</button>
        </div>

    </div>
  )
}

export default MultiStageSelectRoute