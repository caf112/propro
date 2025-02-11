import { CodeGame } from "@/features/game/single/game";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

const SinglePlayRoute = () => {
    // const { isLoading, error } = useStage();
    // if (isLoading) return <Loader />
    // if (error) return <p>Error: {error.message}</p>
    
    const navigate = useNavigate()

    const handleTopPage = () => {
        navigate(paths.top.path)
    }

    const handleStageSelector = () => {
        navigate(paths.game.single.stageSelector.getHref())
    }

  return (
    <div>
        <h1>SinglePlayRoute</h1>
        <CodeGame />
        <button onClick={handleStageSelector}>ステージ選択へ</button>
        <button onClick={handleTopPage}>topへ</button>
    </div>
  )
}

export default SinglePlayRoute


// import { Loader } from '@/components/ui/loader';
// import CodeGame from '@/features/game/local-single/game';
// import { useState } from 'react'
// import { useLocation } from "react-router-dom"

// const SinglePlayRoute = () => {

// //   const [isLoading,setIsLoading] = useState(false);
//   const location = useLocation();

// //   useEffect(() => {
// //     setIsLoading(true);
// //     const timeout = setTimeout(() => {
// //       setIsLoading(false);
// //     },1000)

// //     return () => clearTimeout(timeout)
// //   },[location.pathname])

//   return (
//     <div className="app-container">
//         <>
//           <CodeGame />
//         </>
//     </div>
//   )
// }

// export default SinglePlayRoute