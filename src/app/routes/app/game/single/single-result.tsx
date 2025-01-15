import * as Button from '@/components/ui/button'
import { paths } from '@/config/paths'
import { useNavigate } from 'react-router-dom'

const SingleResultRoute = () => {
  const navigate = useNavigate()

  const handleTopPage = () => {
    navigate(paths.top.path)
  }

  const handleStageSelectPage = () => {
    navigate(paths.game.single.stageSelector.path)
  }
  
  return (
    <div>
      <h1>Result</h1>
      <div>
        <Button.ActionButton onClick={handleStageSelectPage} label="ステージ選択へ" iconClass='single-mode' />
        <Button.ActionButton onClick={handleTopPage} label="トップへ" iconClass='single-mode' />
      </div>
    </div>
  )
}

export default SingleResultRoute