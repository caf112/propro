import { paths } from "@/config/paths"
import { LearnMaterial } from "@/features/materials/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LearnRoute = () => {
  const navigate = useNavigate()
  const [showButtons, setShowButtons] = useState(true)

  const handleMaterial = (language: string) => {
    setShowButtons(false)
    navigate(paths.mypage.material.getHref(language), {
        state: { title: `${language}教材`, pdfUrl: `/materials/${language}.pdf` }
    });
};
    
    
  return (
    <div>
        {showButtons ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>教材一覧</h2>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
              <button onClick={() => handleMaterial("html")}
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
                >HTML</button>
              <button onClick={() => handleMaterial("css")}
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
                >CSS</button>
              <button onClick={() => handleMaterial("js")}
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
                >JavaScript</button>
            </div>
          </div>
        ) : (
          <div>
            <LearnMaterial setShowButtons={setShowButtons} />
          </div>
        )}

    </div>
  )
}

export default LearnRoute