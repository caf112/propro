import { paths } from "@/config/paths";
import { useNavigate } from "react-router-dom"
// import * as Button from '@/components/ui/button'

const SingleStageSelectRoute = () => {

    const navigate = useNavigate();

    const selectTestStage = (stage: string) => {
        navigate(paths.game.single.play.getHref(stage))
    }

    const handleNavigate = (path: string) => {
      navigate(path)
    }

    
  return (
    <div>
        <h1>StageSelect</h1>
        <div>
          <button onClick={() => selectTestStage('1')}>test-stage1</button>
          <button onClick={() => selectTestStage('2')}>test-stage2</button>
          <button onClick={() => selectTestStage('3')}>test-stage3</button>
        </div>
        <div>
          <button onClick={() => handleNavigate(paths.top.path)}>topへ</button>
        </div>

    </div>
  )
}

export default SingleStageSelectRoute