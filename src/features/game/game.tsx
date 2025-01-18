// import { useCode } from "@/hooks/useCode";
import CodeQuestionsJson from '@/features/game/datas/CodeQuestions.json';
import './game.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { paths } from '@/config/paths';
import { useStageParams } from '@/hooks/useGameParams';


export const CodeGame = () => {
    // const { data } = useCode();  //jsonをデータベースから取得するようになったら、こっちにする
    const datas = CodeQuestionsJson;
    const navigate = useNavigate();

    //ステージの取得
    const {stage, stageNumber} = useStageParams();
    const question = stageNumber ? datas[stageNumber] : datas[0];
    if ( !stage ) {
        return <div>無効なステージです。</div>
    }


    //回答
    const [answers, setAnswers ] = useState<{ [key: string]: string }>({})

    const handleChange = (blankId: string, value: string) => {
        setAnswers({...answers, [blankId]: value})
    }
    
    const renderInputs = () => {
        return question.blanks.map((blank, index) => {
            const userAnswer = answers[blank.id] || '';

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
            )
        })
    }

    const getUserCode = () => {
        const processCode = (codeLines: string[]) => {
            return codeLines.map((line) => {
                return line.replace(/\[\[blank_(\d+)\]\]/g, (_, blankIndex) => {
                    const blankId = `blank_${blankIndex}`;
                    return answers[blankId] || ''
                }) ;
            }).join('\n');
        };

        const htmlCode = processCode(question.code.html)
        const cssCode = processCode(question.code.css)
        const jsCode = processCode(question.code.js)

        return {htmlCode, cssCode, jsCode}
    }

    const handleRunCode = () => {
        let correctCount = 0;
        for (const blank of question.blanks) {
            if (answers[blank.id]?.trim() == blank.answer.trim()) {
                correctCount++
            }
        }

        localStorage.setItem('Score', correctCount.toString())
        localStorage.setItem('totalBlank', question.blanks.length.toString())

        const {htmlCode, cssCode, jsCode} = getUserCode()
        localStorage.setItem('htmlCode', htmlCode)
        localStorage.setItem('cssCode', cssCode)
        localStorage.setItem('jsCode', jsCode)
        
        navigate(paths.game.single.result.getHref())
    }


    const handleLookAnswer = () => {
        const answers = question.blanks.reduce((acc, blank) => {
            return {...acc, [blank.id]: blank.answer}
        }, {})
        setAnswers(answers)
    }

    
  return (
    <div>
        <div>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
            <h3>HTML</h3>
            <div className='code-table'>
                <pre>
                    {question.code.html.map((line, i) => (
                        <div className='code-line' key={i}>
                            <span className='line-number'>{i + 1}</span>
                            <span className='code-content'>{line}</span>
                        </div>
                    ))}
                </pre>
            </div>
            <h3>CSS</h3>
            <div className='code-table'>
                <pre>
                    {question.code.css.map((line, i) => (
                        <div className='code-line' key={i}>
                        <span className='line-number'>{i + 1}</span>
                        <span className='code-content'>{line}</span>
                    </div>
                    ))}
                </pre>
            </div>
            <h3>JavaScript</h3>
            <div className='code-table'>
                <pre>
                    {question.code.js.map((line, i) => (
                        <div className='code-line' key={i}>
                            <span className='line-number'>{i + 1}</span>
                            <span className='code-content'>{line}</span>
                        </div>
                    ))}
                </pre>
            </div>
        </div>
        <div>
            <div>
                {renderInputs()}
            </div>
            <div>
                <button onClick={handleRunCode}>回答する</button>
                <button onClick={handleLookAnswer}>正解を表示</button>
            </div>
        </div>
    </div>
  )
}