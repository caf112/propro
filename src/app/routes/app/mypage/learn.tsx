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

    const handleNavigate = (path: string) => {
      setShowButtons(true)
      navigate(path)
    }
    
    
  return (
    <div>
        {showButtons ? (
          <div>
            <h2>教材一覧</h2>
            <button onClick={() => handleMaterial("html")}>HTML</button>
            <button onClick={() => handleMaterial("css")}>CSS</button>
            <button onClick={() => handleMaterial("js")}>JavaScript</button>
          </div>
        ) : (
          <div>
            <button onClick={() => handleNavigate(paths.mypage.learn.getHref())}>教材一覧へ</button>
            <LearnMaterial />
          </div>
        )}

    </div>
  )
}

export default LearnRoute