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
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button onClick={() => handleNavigate(paths.game.single.stageSelector.getHref())} 
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            transition: "0.3s"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#5a6268"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#6c757d"} 
           >ステージ選択画面へ</button>
          <button onClick={() => handleNavigate(paths.top.path)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            transition: "0.3s"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#5a6268"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#6c757d"} >トップ画面へ</button>
        </div>
    </div>
  )
}


export default SingleResultRoute