import { paths } from '@/config/paths'
import { useNavigate } from 'react-router-dom'
import * as Button from '@/components/ui/button'

const ModeSelectorRoute = () => {
  const navigate = useNavigate();

  const handleGamePage = () => {
    navigate(paths.game.single.stageSelector.getHref())
  }
  return (
    <div>
      <h1>Mode Selector</h1>
      <div className='mode-buttons'>
        <Button.ActionButton onClick={handleGamePage} label="一人で" iconClass='single-mode' />
        <Button.ActionButton onClick={handleGamePage} label="みんなで" iconClass='single-mode' />
      </div>
    </div>
  )
}

export default ModeSelectorRoute