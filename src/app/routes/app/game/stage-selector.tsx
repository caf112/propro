import { paths } from "@/config/paths";
import { useNavigate } from "react-router-dom"

const StageSelectorRoute = () => {

    const navigate = useNavigate();

    const selectStage = (stage:string) => {
        navigate(paths.game.stageSelector.getHref(stage))
    }
    
  return (
    <div>
        <h1>StageSelect</h1>
        <div>
            <button onClick={() => selectStage('stage1')} >stage1</button>
            <button onClick={() => selectStage('stage2')} >stage2</button>
        </div>
    </div>
  )
}

export default StageSelectorRoute