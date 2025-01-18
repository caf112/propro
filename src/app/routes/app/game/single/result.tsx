import { paths } from '@/config/paths';
import { CodeRunner } from '@/features/game/code-runner';
import { GameScore } from '@/features/game/score';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Button from '@/components/ui/button'

const SingleResultRoute = () => {
  const navigate = useNavigate()

    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [jsCode, setJsCode] = useState('');

    useEffect(() => {
      const storedHtmlCode = localStorage.getItem('htmlCode') || '';
      const storedCssCode = localStorage.getItem('cssCode') || '';
      const storedJsCode = localStorage.getItem('jsCode') || '';
      setHtmlCode(storedHtmlCode);
      setCssCode(storedCssCode);
      setJsCode(storedJsCode);
    }, []);

    const handleNavigate = (path: string) => {
      navigate(path)
    }

  return (
    <div>
        <CodeRunner htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} />
        <GameScore />
        <Button.ActionButton onClick={() => handleNavigate(paths.game.single.stageSelector.getHref())} label="ステージ選択へ" iconClass=''/>
        <Button.ActionButton onClick={() => handleNavigate(paths.top.path)} label="トップへ" iconClass=''/>
    </div>
  )
}


export default SingleResultRoute