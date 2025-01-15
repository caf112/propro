import { paths } from "@/config/paths";
import { useNavigate } from "react-router-dom"
import * as Button from '@/components/ui/button'

const MultiSelectorRoute = () => {

    const navigate = useNavigate();

    const selectStage = () => {
        navigate(paths.game.multi.stageSelector.play.getHref())
    }
    // const selectStage = (stage:string) => {
    //     navigate(paths.game.multiStageSelector.getHref(stage))
    // }
    
  return (
    <div>
        <h1>StageSelect</h1>
        <div>
            <Button.ActionButton onClick={selectStage} label="ステージ1" iconClass="stage1-icon"/>
            {/* <Button.ActionButton onClick={() => selectStage('stage1')} label="ステージ1" iconClass="stage1-icon"/>
            <Button.ActionButton onClick={() => selectStage('stage2')} label="ステージ2" iconClass="stage1-icon"/>
            <Button.ActionButton onClick={() => selectStage('stage3')} label="ステージ3" iconClass="stage1-icon"/>
            <Button.ActionButton onClick={() => selectStage('stage4')} label="ステージ4" iconClass="stage1-icon"/>
            <Button.ActionButton onClick={() => selectStage('stage5')} label="ステージ5" iconClass="stage1-icon"/>
            <Button.ActionButton onClick={() => selectStage('stage6')} label="ステージ6" iconClass="stage1-icon"/>
            <Button.ActionButton onClick={() => selectStage('stage7')} label="ステージ7" iconClass="stage1-icon"/>
            <Button.ActionButton onClick={() => selectStage('stage8')} label="ステージ8" iconClass="stage1-icon"/> */}
        </div>
    </div>
  )
}

export default MultiSelectorRoute