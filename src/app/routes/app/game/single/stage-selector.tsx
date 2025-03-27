import { Loader } from '@/components/ui/loader'
import { paths } from '@/config/paths'
import { useStage } from '@/hooks/useStage'
import { useNavigate } from 'react-router-dom'

const SingleStageSelectRoute = () => {
  const navigate = useNavigate()
  const { stages, isLoading } = useStage()

  if (isLoading) return <Loader />

  const handleStage = (stage: string) => {
    navigate(paths.game.single.play.getHref(stage))
  }

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const sortedStages = [...stages].sort((a, b) => {
    const stageNumberA = a.id ?? Number.MAX_VALUE
    const stageNumberB = b.id ?? Number.MAX_VALUE
    return stageNumberA - stageNumberB
  })

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ marginBottom: '30px' }}>ステージ選択</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '15px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {stages.length > 0 ? (
          sortedStages.map((stage, index) => (
            <button
              key={index}
              onClick={() => handleStage(String(stage.id))}
              style={{
                padding: '20px 10px',
                fontSize: '16px',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e0e0e0'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0'
              }}
            >
              {`Stage ${stage.id}` || `Stage ${index + 1}`}
            </button>
          ))
        ) : (
          <p>Loading stages...</p>
        )}
      </div>

      <div style={{ marginTop: '40px' }}>
        <button
          onClick={() => handleNavigate(paths.top.path)}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '8px',
            backgroundColor: '#2196F3',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1976D2')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2196F3')}
        >
          Topへ戻る
        </button>
      </div>
    </div>
  )
}

export default SingleStageSelectRoute
