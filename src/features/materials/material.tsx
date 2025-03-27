import { paths } from '@/config/paths'
import { buttonStyle } from '@/components/ui/button/hoverButton'
import { useLocation, useNavigate } from 'react-router-dom'

type LearnMaterialProps = {
  setShowButtons: (value: boolean) => void
}

export const LearnMaterial = ({ setShowButtons }: LearnMaterialProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const material = location.state as { title: string; pdfUrl: string }

  const handleNavigate = (path: string) => {
    setShowButtons(true)
    navigate(path)
  }

  if (!material) {
    return <p>教材が選択されていません。</p>
  }

  return (
    <div>
      <main style={{ padding: '0px', fontFamily: 'Arial, sans-serif' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
            padding: '0 20px',
          }}
        >
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'left' }}>
            {material.title}
          </h2>
          <button
            onClick={() => handleNavigate(paths.mypage.learn.getHref())}
            style={buttonStyle('#5a6268', '#6c757d')}
          >
            教材一覧へ
          </button>
        </div>
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <iframe
            src={material.pdfUrl}
            style={{
              width: '100%',
              height: '800px',
              border: 'none',
              borderRadius: '8px',
            }}
            title={material.title}
          />
        </div>
      </main>
    </div>
  )
}
