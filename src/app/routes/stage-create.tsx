import { generateClient } from "aws-amplify/api";
import type { Schema } from '@/../amplify/data/resource';
import { useEffect, useState } from "react";
import { StageProps, ScoreTypes } from "@/types/api";

const client = generateClient<Schema>({
    authMode: 'userPool',
});

const StageCreateRoute = () => {
    const [stages, setStages] = useState<Schema["Stage"]["type"][]>([]);
    const [codes, setCodes] = useState<Schema["Code"]["type"][]>([])
    const [blanks, setBlanks] = useState<Schema["Blanks"]["type"][]>([])
    const [score, setScore] = useState<Schema["Score"]["type"][]>([])

    // ステージデータを取得
    const fetchStages = async () => {
        const { data: stageItems, errors } = await client.models.Stage.list({});
        if (errors) {
            return console.error('error\n', errors);
        }
        console.log('stages\n', stages)
        setStages(stageItems);
    };
    const fetchCodes = async () => {
        const { data: codeItems, errors } = await client.models.Code.list({});
        if (errors) {
            return console.error('error\n', errors);
        }
        setCodes(codeItems);
    };
    const fetchBlanks = async () => {
        const { data: blankItems, errors } = await client.models.Blanks.list({});
        if (errors) {
            return console.error('error\n', errors);
        }
        setBlanks(blankItems);
    };
    const fetchScore = async () => {
        const { data: scoreItems, errors } = await client.models.Score.list({});
        if (errors) {
            return console.error('error\n', errors);
        }
        setScore(scoreItems);
    };

    useEffect(() => {
        fetchStages();
        fetchCodes();
        fetchBlanks();
        fetchScore();
        const sub = client.models.Stage.observeQuery().subscribe({
            next: ({ items }) => {
                setStages([...items]);
            },
        });

        return () => sub.unsubscribe();
    }, []);
    
    
    // createStage 関数
    const createStage = async ({title, description, code, blanks, score: newScore}: StageProps) => {
        try {
            // ステージ作成
            const { data: stage, errors: stageErrors } = await client.models.Stage.create({
                title,
                description,
            });
    
            if (stageErrors) {
                console.error("Stage creation failed:", stageErrors);
                return null;
            }
        
            // codeをcreate
            let formattedHtmlCode = null;
            let formattedCssCode = null;
            let formattedJsCode = null;

            if (code?.htmlCode) {
                formattedHtmlCode = Array.isArray(code.htmlCode)
                ? code.htmlCode.map((line) => line || null) // Nullable<string>[] に変換
                : [code.htmlCode];
                
            }
            if (code?.cssCode) {
                formattedCssCode = Array.isArray(code.cssCode)
                ? code.cssCode.map((line) => line || null) // Nullable<string>[] に変換
                : [code.cssCode];
    
            }
            if (code?.jsCode) {
                formattedJsCode = Array.isArray(code.jsCode)
                ? code.jsCode.map((line) => line || null) // Nullable<string>[] に変換
                : [code.jsCode];
                
            }

            const { data: codeData, errors: codeErrors } = await client.models.Code.create({
                codeId: stage?.id,
                html: formattedHtmlCode,
                css: formattedCssCode,
                js: formattedJsCode,
            });


            if (codeErrors) {
                console.error("Code creation failed:", codeErrors);
                return stage; // Stage は作成されたが、Code の作成に失敗した場合
            }
    

            //blanksをcreate
            if (Array.isArray(blanks)) {
                for (const blank of blanks) {
                    const { blankKey, placeholder, answer, choices} = blank;

                    const { data: blankData, errors: blanksErrors } = await client.models.Blanks.create({
                        blankId: stage?.id,
                        blankKey,
                        placeholder,
                        answer,
                        choices
        
                    });
            
                    if (blanksErrors) {
                        console.error("blanks creation failed:", blanksErrors);
                        return null;
                    }


                }
            }

            const {attempt, score} = newScore;
            const { data: scoreData, errors: scoreErrors } = await client.models.Score.create({
                scoreId: stage?.id,
                attempt,
                score,
            })

            if (scoreErrors) {
                console.error("score creation failed:", scoreErrors);
                return null;
            }
            
            
            
            
        } catch (error) {
            console.error("Error in createStage:", error);
            return null;
        }
    };

    const addScore = async (stageId: any, newScore: ScoreTypes) => {
        try {
            const { attempt, score } = newScore;
            const { data: scoreData, errors: scoreErrors } = await client.models.Score.create({
                scoreId: stageId, // スコアを関連付けるステージのID
                score,
                attempt,
            });
    
            if (scoreErrors) {
                console.error("Score creation failed:", scoreErrors);
                return null;
            }
    
            console.log("Score successfully added:", scoreData);
            return scoreData;
        } catch (error) {
            console.error("Error in addScore:", error);
            return null;
        }
    };


    return (
        <div className="stage-create">
            <h1>Stages</h1>
            <button
                onClick={async () => {
                    const stageId = stages[0]?.id; // 最初のステージID（例: 任意のステージIDを取得する必要がある場合に変更）
                    if (!stageId) {
                        console.error("No stage selected to add score.");
                        return;
                    }

                    const newScore = {
                        score: 50, // 任意のスコア
                        attempt: 2, // 試行回数
                    };

                    const addedScore = await addScore(stageId, newScore);

                    if (addedScore) {
                        console.log("New score added to stage:", addedScore);
                        fetchScore(); // スコアリストを更新
                    }
                }}
            >
                Add Score
            </button>
            <button
                onClick={async () => {
                    const newStage = await createStage({

                        title: "New Stage Title",
                        description: "New Stage Description",
                        code: {
                            htmlCode: ["<html>Sample HTML</html>", 
                                "<html lang=\"en\">", "<head>", 
                                "  <meta charset=\"UTF-8\">",
                                "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
                                "  <title>カウンター</title>",
                                "  <link rel=\"stylesheet\" href=\"style.css\">",
                                "</head>",
                                "<body>",
                                "  <div id=\"counter\">0</div>",
                                "  <button id=\"incrementBtn\">増やす</button>",
                                "  <script src=\"script.js\"></script>",
                                "</body>",
                                "</html>"
                            ],
                            cssCode: [
                                "/* エラーメッセージのスタイル */",
                                "#errorMsg {",
                                "  color: red;",
                                "  [[blank_1]]",
                                "}"
                            ],
                            jsCode: [
                                "document.getElementById('userForm').addEventListener('submit', function(event) {",
                                "  let username = document.getElementById('username').value;",
                                "  if (username === '') {",
                                "    event.preventDefault();",
                                "    document.getElementById('errorMsg').[[blank_2]] = 'ユーザー名を入力してください。';",
                                "  }",
                                "});"
                            ]
                        },
                        blanks:[
                            {
                                blankKey: "blank_1",
                                placeholder: "CSSのプロパティを選択",
                                answer: "font-weight: bold;",
                                choices: [
                                    "font-weight: bold;",
                                    "font-style: italic;",
                                    "text-decoration: underline;"
                                ],
                            },
                            {
                                blankKey: "blank_2",
                                placeholder: "プロパティを選択",
                                answer: "textContent",
                                choices: [
                                    "textContent", 
                                    "innerHTML",
                                    "value"
                                ]
                            }
                        ],
                        score: {
                            attempt: 1,
                            score: 100
                        }
                    });
                    if (newStage) fetchStages(); // 新しいステージが作成された場合のみリストを更新
                }}
            >
                Create Stage
            </button>
            <ul>
    {stages.map((stage) => {
        // 対応するコードを検索
        const relatedCode = codes.find((code) => code.codeId === stage.id);
        const relatedBlanks = blanks.filter((blank) => blank.blankId === stage.id)
        const relatedScore = score.filter((score) => score.scoreId === stage.id)

        return (
            <li key={stage.id}>
                <h2>{stage.title}</h2>
                <p>{stage.description}</p>
                <h3>Code:</h3>
                {relatedCode?.html && (
                    <div>
                        <h3>html</h3>
                        <pre>
                            {/* 型ガードを追加してhtmlが文字列か配列かを判定 */}
                            {Array.isArray(relatedCode.html)
                                ? relatedCode.html.map((line) => line || "").join("\n") // 配列の場合
                                : typeof relatedCode.html === "string"
                                ? relatedCode.html // 文字列の場合
                                : "" /* その他の場合は空文字 */}
                        </pre>
                    </div>
                )}
                {relatedCode?.css && (
                    <div>
                        <h3>css</h3>
                        <pre>
                            {/* 型ガードを追加してcssが文字列か配列かを判定 */}
                            {Array.isArray(relatedCode.css)
                                ? relatedCode.css.map((line) => line || "").join("\n") // 配列の場合
                                : typeof relatedCode.css === "string"
                                ? relatedCode.css // 文字列の場合
                                : "" /* その他の場合は空文字 */}
                        </pre>
                    </div>
                )}
                {relatedCode?.js && (
                    <div>
                        <h3>js</h3>
                        <pre>
                            {/* 型ガードを追加してjsが文字列か配列かを判定 */}
                            {Array.isArray(relatedCode.js)
                                ? relatedCode.js.map((line) => line || "").join("\n") // 配列の場合
                                : typeof relatedCode.js === "string"
                                ? relatedCode.js // 文字列の場合
                                : "" /* その他の場合は空文字 */}
                        </pre>
                    </div>
                )}
                <h3>Blanks:</h3>
                {relatedBlanks.length > 0 ? (
                    <ul>
                        {relatedBlanks.map((blank) => (
                            <li key={blank.blankKey}>
                                <strong>{blank.placeholder}</strong>: {blank.answer}
                                <br />
                                Choices: {blank.choices?.join(", ")}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                    <p>No blanks associated with this stage.</p>
                    </div>
                )}
                {relatedScore.length > 0 ? (
                    <ul>
                        {relatedScore.map((score) => (
                            <li key={score.attempt}>
                                {score.score}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>スコアはありません</p>
                )}
                
            </li>
        );
    })}
</ul>
        </div>
    );
};

export default StageCreateRoute;
