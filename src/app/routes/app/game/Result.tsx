import { CodeRunner } from '@/features/game/codeRunner';
import { GameScore } from '@/features/game/scores';
import { useEffect, useState } from 'react'

const PreviewRoute = () => {

    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [jsCode, setJsCode] = useState('');

    console.log("Preview\n",jsCode)
  
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


export default PreviewRoute