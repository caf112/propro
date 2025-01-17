// import { useCode } from "@/hooks/useCode";
import CodeQuestionsJson from '@/features/game/datas/CodeQuestions.json';
import './game.css'
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';


export const TestGame = () => {
    // const { data } = useCode();  //jsonをデータベースから取得するようになったら、こっちにする
    const datas = CodeQuestionsJson;

    //ステージ選択
    const [searchParams] = useSearchParams();
    const stage = searchParams.get('stage');
    const stageNumber = stage ? parseInt(stage) : null;
    const question = stageNumber ? datas[stageNumber] : datas[0];
    if ( !stage ) {
        return <div>無効なステージです。</div>
    }


    //回答
    const [answer, setAnswers ] = useState<{ [key: string]: string }>({})

    const handleChange = (blankId: string, value: string) => {
        setAnswers({...answer, [blankId]: value})
    }
    
    const renderInputs = () => {
        return question.blanks.map((blank, index) => {
            const userAnswer = answer[blank.id] || '';

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
            {renderInputs()}
        </div>
    </div>
  )
}

export default TestGame