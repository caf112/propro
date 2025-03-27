import { useEffect } from 'react'
import { Loader } from '@/components/ui/loader'
import { useRoom } from '@/hooks/useRoom'
import { client } from '@/lib/schemes'
import { buttonStyle } from '@/components/ui/button/hoverButton'

export const RecruitMember = ({ roomId }: { roomId?: string }) => {
  localStorage.getItem('roomId')

  // roomId を localStorage に保存
  useEffect(() => {
    if (roomId !== undefined) {
      localStorage.setItem('roomId', roomId)
    }
  }, [roomId])

  const { currentRoom, isLoading, refetch } = useRoom(roomId)

  // console.error("RecruitMemberのerror\n", error)

  useEffect(() => {
    // observeQuery でリアルタイムデータを監視
    const sub = client.models.Room.observeQuery().subscribe({
      next: () => {
        refetch()
      },
    })

    return () => sub.unsubscribe()
  }, [refetch])

  const getPlayerIcon = (index: number) => {
    const playerNumber = (index % 4) + 1
    return `/assets/${playerNumber}p.png`
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {!isLoading ? (
        <>
          <button onClick={() => refetch} style={buttonStyle('#6c757d', '#5a6268')}>
            Refresh
          </button>
          <p>
            <strong>あいことば:</strong>
          </p>
          <p style={{ border: '1px solid #000', padding: '2px 5px', display: 'inline-block' }}>
            {currentRoom?.password || 'なし'}
          </p>

          {currentRoom?.members?.length ? (
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
              {currentRoom.members.map((member, index) => (
                <li
                  key={member?.username}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                  }}
                >
                  <img
                    src={getPlayerIcon(index)}
                    alt={`P${index + 1}`}
                    width={45}
                    height={45}
                    style={{
                      border: '2px solid #000',
                      borderRadius: '50%',
                      padding: '1px',
                      backgroundColor: '#fff',
                    }}
                  />
                  <span style={{ fontSize: '25px', fontWeight: 'bold' }}>{member?.username}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>メンバーはいません</p>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}
