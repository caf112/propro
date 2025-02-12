import { paths } from '@/config/paths'
import { useNavigate } from 'react-router-dom'

const ModeSelectRoute = () => {
  const navigate = useNavigate();

  const handleModeSelect = (path: string) => {
    navigate(path)
  }
  
  // navigateのbuttonを作ろう
  
  return (
    <div>
      <h1>モード選択</h1>
      <div className='mode-buttons'>
        <button onClick={() => handleModeSelect(paths.game.single.stageSelector.getHref())}>一人で</button>
        <button onClick={() => handleModeSelect(paths.game.multi.recruit.getHref())}>みんなで</button>
      </div>
    </div>
  )
}

export default ModeSelectRoute