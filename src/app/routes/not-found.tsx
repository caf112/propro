import { paths } from "@/config/paths"
import { useNavigate } from "react-router-dom"

const NotFoundRoute = () => {
  const navigate = useNavigate()

  const handleTopPage = () => {
    navigate(paths.top.path)
  }

  
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 >NotFound</h1>
        <img src="../../character/usa_cry.png" alt="Not Found" />
        <br/>
        <button onClick={handleTopPage} style={{
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
            Topページへ
        </button>
    </div>
  )
}

export default NotFoundRoute