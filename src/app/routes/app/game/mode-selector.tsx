import { paths } from '@/config/paths'
import { useNavigate } from 'react-router-dom'
import * as Button from '@/components/ui/button'

const ModeSelectRoute = () => {
  const navigate = useNavigate();

  const handleSingleMode = () => {
    navigate(paths.game.single.stageSelector.getHref())
  }
  const handleMultiMode = () => {
    navigate(paths.game.multi.recruit.getHref())
  }
  
  // navigateのbuttonを作ろう
  
  return (
    <div>
      <h1>Mode Selector</h1>
      <div className='mode-buttons'>
        <Button.ActionButton onClick={() => handleSingleMode()} label="一人で" iconClass='single-mode' />
        <Button.ActionButton onClick={() => handleMultiMode()} label="みんなで" iconClass='multi-mode' />
      </div>
    </div>
  )
}

export default ModeSelectRoute