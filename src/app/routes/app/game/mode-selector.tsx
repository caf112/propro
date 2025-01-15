import { paths } from '@/config/paths'
import { useNavigate } from 'react-router-dom'
import * as Button from '@/components/ui/button'

const ModeSelectorRoute = () => {
  const navigate = useNavigate();

  const handleSinglePage = () => {
    navigate(paths.game.single.stageSelector.getHref())
  }
  const handleMultiPage = () => {
    navigate(paths.game.multi.recruit.getHref())
  }
  return (
    <div>
      <h1>Mode Selector</h1>
      <div className='mode-buttons'>
        <Button.ActionButton onClick={handleSinglePage} label="一人で" iconClass='single-mode' />
        <Button.ActionButton onClick={handleMultiPage} label="みんなで" iconClass='single-mode' />
      </div>
    </div>
  )
}

export default ModeSelectorRoute