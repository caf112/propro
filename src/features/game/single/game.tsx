import { useCode } from "@/hooks/useCode";
// import CodeQuestionsJson from '@/features/game/datas/CodeQuestions.json';
import './game.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { paths } from '@/config/paths';
import { useStageParams } from '@/hooks/useGameParams';


export const CodeGame = () => {
    const { stages, codes, blanks, addScore } = useCode();  
    const navigate = useNavigate();

    //ステージの取得
    const {stageNumberPram} = useStageParams();
    const currentStage = stages.find(stage => stage.stageNumber === stageNumberPram)
    if (!currentStage) {
        return <div>無効なステージです</div>
    }
    const currentBlanks = blanks.filter(blank => blank.blankId === currentStage.id);
    const currentCodes = codes.filter(code => code.codeId === currentStage.id)
    // const currentScores = scores.filter(score => score.scoreId === currentStage.id)
    // if ( !currentBlanks ) {
    //     return <div>無効なステージです。</div>
    // }


    //回答
    const [answers, setAnswers ] = useState<{ [key: string]: string }>({})

    const handleChange = (blankId: string, value: string) => {
        setAnswers({...answers, [blankId]: value})
    }
    
    const renderInputs = () => {
        return currentBlanks.map((blank, index) => {
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
                        {blank.choices?.filter(choice => choice !== null)
                            .map((choice, choiceIdx) => (
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
        const processCode = (codeLines: (string | null)[]) => {
            const filteredLines = codeLines.filter((line) : line is string => line != null)
            return filteredLines.map((line) => {
                return line.replace(/\[\[blank_(\d+)\]\]/g, (_, blankIndex) => {
                    const blankId = `blank_${blankIndex}`;
                    return answers[blankId] || ''
                }) ;
            }).join('\n');
        };

        const htmlCode = currentCodes.map(code => processCode(code.html || []))
        const cssCode = currentCodes.map(code => processCode(code.css || []))
        const jsCode = currentCodes.map(code => processCode(code.js || []))

        return {htmlCode, cssCode, jsCode}
    }

    const handleRunCode = async () => {
        let correctCount = 0;

        for (const blank of currentBlanks) {
            const userAnswer = answers[blank.id]?.trim();
            const correctAnswer = blank.answer?.trim();
    
            if (correctAnswer && userAnswer === correctAnswer) {
                correctCount++;
            }
        }

        //Scoresへ格納
        const normalizedScore = currentBlanks.length > 0 ? (correctCount / currentBlanks.length ) * 100 : 0
        try {
            const stageId = currentStage.id
            const newScore = normalizedScore

            
            const result = await addScore(stageId, newScore)
            console.log("スコアが正常に保存されました", result)
        } catch (error) {
            console.error("スコア保存中にエラーが発生しました", error)
        }

        //localStorageへ格納
        localStorage.setItem('Score', correctCount.toString())
        localStorage.setItem('totalBlank', currentBlanks.length.toString())
        
        const {htmlCode, cssCode, jsCode} = getUserCode()
        localStorage.setItem('htmlCode', htmlCode.join('\n'))
        localStorage.setItem('cssCode', cssCode.join('\n'))
        localStorage.setItem('jsCode', jsCode.join('\n'))
        
        navigate(paths.game.single.result.getHref())
    }


    const handleLookAnswer = () => {
        const answers = currentBlanks.reduce((acc, blank) => {
            return {...acc, [blank.id]: blank.answer}
        }, {})
        setAnswers(answers)
    }

    
  return (
    <div>
        <div>
            <h2>{currentStage.title}</h2>
            <p>{currentStage.description}</p>
            <h3>HTML</h3>
            <div className='code-table'>
                <pre>
                    {currentCodes.flatMap(code => code.html || []).map((line, i) => (
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
                    {currentCodes.flatMap(code => code.css || []).map((line, i) => (
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
                    {currentCodes.flatMap(code => code.js || []).map((line, i) => (
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