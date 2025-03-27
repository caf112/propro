import { imagePaths, paths } from '@/config/paths'
import { useNavigate } from 'react-router-dom'

const ModeSelectRoute = () => {
  const navigate = useNavigate()

  const handleModeSelect = (path: string) => {
    navigate(path)
  }

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>モード選択</h1>
      <div
        className="mode-buttons"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '40px',
          marginTop: '40px',
        }}
      >
        {/* ひとりでカード */}
        <div
          style={{
            width: '220px',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            backgroundColor: '#fff',
          }}
        >
          <img
            src={imagePaths.icon.single}
            alt="ひとりで"
            style={{ width: '100px', height: 'auto', marginBottom: '20px' }}
          />
          <button
            onClick={() => handleModeSelect(paths.game.single.stageSelector.getHref())}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: '#4CAF50',
              color: '#fff',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45A049')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
          >
            ひとりで
          </button>
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            一人でじっくりプレイするモードです。
            <br />
            穴埋め問題です。
          </p>
        </div>

        {/* みんなでカード */}
        <div
          style={{
            width: '220px',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            backgroundColor: '#fff',
          }}
        >
          <img
            src={imagePaths.icon.multi}
            alt="みんなで"
            style={{ width: '100px', height: 'auto', marginBottom: '20px' }}
          />
          <button
            onClick={() => handleModeSelect(paths.game.multi.recruit.getHref())}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: '#2196F3',
              color: '#fff',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1976D2')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2196F3')}
          >
            みんなで
          </button>
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            友達と一緒に最大4人プレイするマルチプレイモードです。
          </p>
        </div>
      </div>
    </div>
  )
}

export default ModeSelectRoute
