// import { useCode } from "@/hooks/useCode";
import CodeQuestionsJson from '@/features/game/datas/CodeQuestions.json';
import './game.css'
import { useSearchParams } from 'react-router-dom';


export const TestGame = () => {
    // const { data } = useCode();  //jsonをデータベースから取得するようになったら、こっちにする
    const data = CodeQuestionsJson;
    // console.log("data", data);

    //stage=jsonのidにすればよい。data[stage]とする

    const [searchParams] = useSearchParams();
    const stage = searchParams.get('stage');
    const stageNumber = stage ? parseInt(stage) : null;
    const question = stageNumber ? data[stageNumber] : data[0];//id:0にテストデータを入れようか

    console.log(stage)

    console.log(stageNumber)

    if ( !stage ) {
        return <div>無効なステージです。</div>
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
    </div>
  )
}

export default TestGame