import { useState } from 'react';
import { Blank } from '@/types/api'; 
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/config/paths';
import { useStageParams } from '@/hooks/useStageParams';
import { Loader } from '@/components/ui/loader';
import { useCode } from '@/hooks/useCode';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('css', css);


export const CodeGame = () => {
const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const {stageNumberPram} = useStageParams()
  const stageNum = stageNumberPram

  const {codeQuery, isLoading} = useCode(stageNum)
  if(isLoading) {
    return <Loader />
}
if (!codeQuery.data) return <Loader />
  if (codeQuery.error) {
    return <p>{codeQuery.error.message}</p>
  }

  const problemData = codeQuery.data
  

  const handleChange = (blankId: string, value: string) => {
    setAnswers({ ...answers, [blankId]: value });
  };

  const handleShowSolution = () => {
    const userConfirmed = window.confirm('本当に答えを見ますか？');
  if (userConfirmed) {
    setShowSolution(true); 
  } else {
    console.log('答えの表示をキャンセルしました。');
  }
  };

  const getUserCode = () => {
    const processCode = (codeLines: string[]) => {
      return codeLines.map((line) => {
        return line.replace(/\[\[blank_(\d+)\]\]/g, (p1) => {
          const blankId = `blank_${p1}`;
          const userAnswer = answers[blankId] || '';
          return showSolution ? problemData.blanks.find((blank: Blank )=> blank.id === blankId)?.answer || '' : userAnswer || '___';
        });
      }).join('\n');
    };

    const htmlCode = processCode(problemData.code?.html || "");
    const cssCode = processCode(problemData.code?.css || "");
    const jsCode = processCode(problemData.code?.js || "");

    return { htmlCode, cssCode, jsCode };
  };

  const handleRunCode = () => {
    let correctCount = 0;
    for (const blank of problemData.blanks) {
      if (answers[blank.id]?.trim() !== blank.answer.trim()) {
        correctCount++;
      }
    }

    localStorage.setItem('Score',correctCount.toString());
    localStorage.setItem('totalBlank',correctCount.toString());

    const { htmlCode, cssCode, jsCode } = getUserCode();
    localStorage.setItem('htmlCode', htmlCode);
    localStorage.setItem('cssCode', cssCode);
    localStorage.setItem('jsCode', jsCode);

    
    navigate(paths.game.single.result.getHref());
  };

  const renderCodeSection = (language: string, code: string) => (
    <SyntaxHighlighter language={language} style={docco}>
      {code}
    </SyntaxHighlighter>
  );

  const renderInputs = () => {
    return problemData.blanks.map((blank: Blank, index: number) => {
      const userAnswer = answers[blank.id] || '';

      if (showSolution) {
        return (
          <div key={index}>
            <strong>{blank.placeholder}:</strong> {blank.answer}
          </div>
        );
      } else {
        return (
          <div key={index}>
            <strong>{blank.placeholder}:</strong>
            <select
              value={userAnswer}
              onChange={(e) => handleChange(blank.id, e.target.value)}
            >
              <option value="" disabled>
                選択してください
              </option>
              {blank.choices.map((choice, choiceIdx) => (
                <option key={choiceIdx} value={choice}>
                  {choice}
                </option>
              ))}
            </select>
          </div>
        );
      }
    });
  };

  const { htmlCode, cssCode, jsCode } = getUserCode();

  return (
    <div>
      <h2>{problemData.title}</h2>
      <p>{problemData.description}</p>
      

      <h3>HTMLコード</h3>
      {renderCodeSection('html', htmlCode)}

      {cssCode.trim() && (
        <>
          <h3>CSSコード</h3>
          {renderCodeSection('css', cssCode)}
        </>
      )}

      {jsCode.trim() && (
        <>
          <h3>JavaScriptコード</h3>
          {renderCodeSection('javascript', jsCode)}
        </>
      )}

      <div>{renderInputs()}</div>

      <button onClick={handleRunCode} >コードを見る</button>
      <button onClick={handleShowSolution} >解答を見る</button>
    </div>
  );
};