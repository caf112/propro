import { paths } from '@/config/paths';
import { CodeRunner } from '@/features/game/single/code-runner';
import { GameScore } from '@/features/game/single/score';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
        <button onClick={() => handleNavigate(paths.game.single.stageSelector.getHref())} >ステージ選択画面へ</button>
        <button onClick={() => handleNavigate(paths.top.path)} >トップ画面へ</button>
    </div>
  )
}


export default SingleResultRoute