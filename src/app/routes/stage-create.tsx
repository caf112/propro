// import { generateClient } from "aws-amplify/api";
// import type { Schema } from '@/../amplify/data/resource';
// import { useEffect, useState } from "react";
// import { StageProps } from "@/types/api";
// import { useNavigate } from "react-router-dom";
// import { paths } from "@/config/paths";

// const client = generateClient<Schema>({
//     authMode: 'userPool',
// });

// const StageCreateRoute = () => {
//     const navigate = useNavigate();
    
//     const [stages, setStages] = useState<Schema["Stage"]["type"][]>([]);
//     const [uploadedData, setUploadedData] = useState<any[]>([]);
//     const [isProcessing, setIsProcessing] = useState(false);

//     // ステージデータを取得
//     const fetchStages = async () => {
//         try {
//             const { data: stageItems, errors } = await client.models.Stage.list({});
//             if (errors) {
//                 console.error("ステージデータの取得中にエラーが発生しました:", errors);
//                 return;
//             }
//             setStages(stageItems);
//         } catch (error) {
//             console.error("ステージデータの取得中に予期しないエラーが発生しました:", error);
//         }
//     };

//     // ファイルアップロード処理
//     const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (!file) return;

//         const reader = new FileReader();

//         reader.onload = (e) => {
//             try {
//                 const jsonData = JSON.parse(e.target?.result as string);
//                 setUploadedData(jsonData);
//                 console.log("JSON データをアップロードしました:", jsonData);
//             } catch (error) {
//                 console.error("JSON パースエラー:", error);
//             }
//         };

//         reader.readAsText(file);
//     };

//     // JSON からステージを登録する関数
//     const handleCreateStages = async () => {
//         if (uploadedData.length === 0) {
//             console.error("アップロードされたデータがありません");
//             return;
//         }

//         setIsProcessing(true);
//         for (const stage of uploadedData) {
//             const formattedCode = {
//                 htmlCode: stage.code.html,
//                 cssCode: stage.code.css,
//                 jsCode: stage.code.js,
//             };

//             const formattedBlanks = stage.blanks.map((blank: any) => ({
//                 blankKey: blank.id,
//                 placeholder: blank.placeholder,
//                 answer: blank.answer,
//                 choices: blank.choices,
//             }));

//             const formattedStage: StageProps = {
//                 stageNumber: stage.id,
//                 title: stage.title,
//                 description: stage.description,
//                 code: formattedCode,
//                 blanks: formattedBlanks,
//                 score: {
//                     attempt: 1,
//                     score: 100,
//                 },
//             };

//             await createStage(formattedStage);
//         }
//         setIsProcessing(false);
//         fetchStages(); // 登録後にステージを再取得
//         console.log("ステージをすべて作成しました");
//     };

//     // createStage 関数
//     const createStage = async ({ stageNumber, title, description, code, blanks, score: newScore }: StageProps) => {
//         try {
//             const { data: stage, errors: stageErrors } = await client.models.Stage.create({
//                 stageNumber,
//                 title,
//                 description,
//             });

//             if (stageErrors) {
//                 console.error("Stage creation failed:", stageErrors);
//                 return null;
//             }

//             // Code の作成
//             const { errors: codeErrors } = await client.models.Code.create({
//                 codeId: stage?.id,
//                 html: Array.isArray(code.htmlCode) ? code.htmlCode : [code.htmlCode],
//                 css: Array.isArray(code.cssCode) ? code.cssCode : [code.cssCode],
//                 js: Array.isArray(code.jsCode) ? code.jsCode : [code.jsCode],
//             });

//             if (codeErrors) {
//                 console.error("Code creation failed:", codeErrors);
//                 return stage;
//             }

//             // Blanks の作成
//             for (const blank of blanks) {
//                 const { errors: blanksErrors } = await client.models.Blanks.create({
//                     blankId: stage?.id,
//                     blankKey: blank.blankKey,
//                     placeholder: blank.placeholder,
//                     answer: blank.answer,
//                     choices: blank.choices,
//                 });

//                 if (blanksErrors) {
//                     console.error("Blanks creation failed:", blanksErrors);
//                     return null;
//                 }
//             }

//             // Score の作成
//             const { attempt, score } = newScore;
//             const { errors: scoreErrors } = await client.models.Score.create({
//                 scoreId: stage?.id,
//                 attempt,
//                 score,
//             });

//             if (scoreErrors) {
//                 console.error("Score creation failed:", scoreErrors);
//                 return null;
//             }

//             console.log("Stage created successfully:", stage);
//         } catch (error) {
//             console.error("Error in createStage:", error);
//         }
//     };

//     // コンポーネントマウント時にステージデータを取得
//     useEffect(() => {
//         fetchStages();
//     }, []);

//     const handleTopPage = () => {
//         navigate(paths.top.path);
//     }

//     return (
//         <div className="stage-create">
//             <h1>Stages</h1>
//             <button onClick={handleTopPage}>Topへ</button>
//             <input
//                 type="file"
//                 accept="application/json"
//                 onChange={handleFileUpload}
//             />
//             <button
//                 onClick={handleCreateStages}
//                 disabled={uploadedData.length === 0 || isProcessing}
//             >
//                 {isProcessing ? "作成中..." : "作成する"}
//             </button>
//             <ul>
//                 {stages.map((stage) => (
//                     <li key={stage.id}>
//                         <h3>{stage.title}</h3>
//                         <p>{stage.description}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default StageCreateRoute;
