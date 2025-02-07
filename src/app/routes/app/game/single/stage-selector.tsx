// import { paths } from "@/config/paths";
// import { useNavigate } from "react-router-dom"
// import { useCode } from "@/hooks/useCode";
// // import * as Button from '@/components/ui/button'

// const SingleStageSelectRoute = () => {

//     const navigate = useNavigate();
//     const { stages, error } = useCode()

//     if (error) {
//       return console.error(error)
//     }


//     //buttonの処理
//     const handleStage = (stage: string) => {
//         navigate(paths.game.single.play.getHref(stage))
//     }
//     const handleNavigate = (path: string) => {
//       navigate(path)
//     }

//     //stagesを昇順に並び替え
//     const sortedStages = [...stages].sort((a, b) => {
//       const stageNumberA = a.stageNumber ?? Number.MAX_VALUE; 
//       const stageNumberB = b.stageNumber ?? Number.MAX_VALUE; 
//       return stageNumberA - stageNumberB;
//   });
    
//   return (
//     <div>
//         <h1>StageSelect</h1>
//         <div>
//           {stages.length > 0 ? (
//             sortedStages.map((stage, index) => (
//               <button key={index} onClick={() => handleStage(String(stage.stageNumber))}>
//                 {`stage${stage.stageNumber}` || `Stage ${index + 1}`}
//               </button>
//             ))
//           ) : (
//             <p>Loading stages...</p>
//           )}
//         </div>
//         <div>
//           <button onClick={() => handleNavigate(paths.top.path)}>topへ</button>
//         </div>
//     </div>
//   )
// }

// export default SingleStageSelectRoute