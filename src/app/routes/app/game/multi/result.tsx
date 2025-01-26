import { paths } from '@/config/paths';
import { useNavigate } from 'react-router-dom';
import * as Button from '@/components/ui/button'
import { MultiCodeRunner } from '@/features/game/multi/code-runner';

const MultiResultRoute = () => {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
  }



  return (
    <div>
      <MultiCodeRunner />
      <Button.ActionButton onClick={() => handleNavigate(paths.game.multi.stageSelector.getHref())} label="ステージ選択へ" iconClass=''/>
      <Button.ActionButton onClick={() => handleNavigate(paths.top.path)} label="トップへ" iconClass=''/>
    </div>
  )
}


export default MultiResultRoute