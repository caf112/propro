import * as Previews from '@/features/game/index'
import { CodeRunner } from '@/features/game/CodeRunner';
import { GameScore } from '@/features/game/Scores';
import { useEffect, useState } from 'react'

const Preview = () => {

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

  return (
    <div>
        <CodeRunner htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} />
        <GameScore />
    </div>
  )
}


export default Preview