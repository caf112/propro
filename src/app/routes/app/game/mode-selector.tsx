import { paths } from '@/config/paths'
import { useNavigate } from 'react-router-dom'

const ModeSelectRoute = () => {
  const navigate = useNavigate();

  const handleModeSelect = (path: string) => {
    navigate(path)
  }
  
  
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>モード選択</h1>
      <div 
        className="mode-buttons"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '20px' }}
      >
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => handleModeSelect(paths.game.single.stageSelector.getHref())}
            style={{ padding: '15px 30px', fontSize: '18px', borderRadius: '8px', cursor: 'pointer' }}
          >
            ひとりで
          </button>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            一人でじっくりプレイするモードです。<br/>
            穴埋め問題です。
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => handleModeSelect(paths.game.multi.recruit.getHref())}
            style={{ padding: '15px 30px', fontSize: '18px', borderRadius: '8px', cursor: 'pointer' }}
          >
            みんなで
          </button>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            友達と一緒に最大4人プレイするマルチプレイモードです。
          </p>
        </div>
      </div>
    </div>
  )
}

export default ModeSelectRoute