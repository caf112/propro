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
        <CodeGame />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
    <button 
      onClick={handleStageSelector} 
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
    >
      ステージ選択へ
    </button>

    <button 
      onClick={handleTopPage} 
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
    >
      topへ
    </button>
  </div>
    </div>
  )
}

export default SinglePlayRoute