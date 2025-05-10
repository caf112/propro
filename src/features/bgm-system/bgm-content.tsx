import { useState, useEffect, useRef } from 'react'
import './bgm-content.css'

interface Track {
  id: string
  name: string
  color: string
  audioPath: string
}

export const InteractiveBGMController = () => {
  // BGMトラックのデータ
  const tracks: Track[] = [
    {
      id: 'main',
      name: 'メインテーマ',
      color: 'blue',
      audioPath: '/audio/bgm1.mp3',
    },
    {
      id: 'battle',
      name: 'バトルテーマ',
      color: 'red',
      audioPath: '/audio/bgm1.mp3',
    },
    {
      id: 'peaceful',
      name: '穏やかなテーマ',
      color: 'green',
      audioPath: '/audio/bgm1.mp3',
    },
    {
      id: 'suspense',
      name: 'サスペンス',
      color: 'purple',
      audioPath: '/audio/bgm1.mp3',
    },
  ]

  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(-15)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [initialized, setInitialized] = useState<boolean>(false)
  const [isMinimized, setIsMinimized] = useState<boolean>(false)

  const audioRef = useRef<AudioBufferSourceNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  // オーディオコンテキストの初期化とBGM再生開始
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new AudioContext()
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.connect(audioContextRef.current.destination)

      // 即時再生開始
      setInitialized(true)
      selectTrack('main')
    }
  }, [])

  // BGMトラック選択
  const selectTrack = async (trackId: string) => {
    const track = tracks.find((t) => t.id === trackId)
    if (!track || !audioContextRef.current) return

    try {
      // 現在のトラックを停止
      if (audioRef.current) {
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.linearRampToValueAtTime(
            0,
            audioContextRef.current.currentTime + 0.3,
          )
        }
        setTimeout(() => {
          audioRef.current?.stop()
        }, 300)
      }

      // 新しいトラックの読み込みと再生
      const response = await fetch(track.audioPath)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer)

      // 少し待機してから新しいトラックを開始
      setTimeout(() => {
        if (!audioContextRef.current) return

        const source = audioContextRef.current.createBufferSource()
        source.buffer = audioBuffer
        source.connect(gainNodeRef.current!)
        source.loop = true

        if (gainNodeRef.current) {
          gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime)
          gainNodeRef.current.gain.linearRampToValueAtTime(
            Math.pow(10, volume / 20),
            audioContextRef.current.currentTime + 0.3,
          )
        }

        source.start(0)
        audioRef.current = source as any
        setCurrentTrack(trackId)
        setIsPlaying(true)
      }, 300)
    } catch (error) {
      console.error('Error playing audio:', error)
    }
  }

  // 再生/一時停止の切り替え
  const togglePlayback = () => {
    if (!audioRef.current || !audioContextRef.current) return

    if (isPlaying) {
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0,
          audioContextRef.current.currentTime + 0.3,
        )
      }
      setTimeout(() => {
        audioRef.current?.stop()
      }, 300)
    } else {
      selectTrack(currentTrack!)
    }
    setIsPlaying(!isPlaying)
  }

  // ミュート切り替え
  const toggleMute = () => {
    if (!gainNodeRef.current || !audioContextRef.current) return

    if (isMuted) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        Math.pow(10, volume / 20),
        audioContextRef.current.currentTime + 0.1,
      )
    } else {
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.1)
    }
    setIsMuted(!isMuted)
  }

  // ボリューム調整
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)
    setVolume(newVolume)

    if (gainNodeRef.current && !isMuted) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        Math.pow(10, newVolume / 20),
        audioContextRef.current?.currentTime || 0 + 0.1,
      )
    }
  }

  // 最小化/最大化の切り替え
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  // 現在のトラック情報
  const activeTrack = tracks.find((t) => t.id === currentTrack)

  if (isMinimized) {
    return (
      <div className="bgm-controller minimized">
        <div className="minimized-content">
          <div className={`pulse-dot ${activeTrack?.color || 'gray'}`}></div>
          <span className="minimized-text">{activeTrack?.name || 'BGM'}</span>
          <button onClick={toggleMinimize} className="minimize-button">
            ▼
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bgm-controller">
      <div className="controller-header">
        <h2>BGMコントローラー</h2>
        <button onClick={toggleMinimize} className="minimize-button">
          ▲
        </button>
      </div>

      {!initialized ? (
        <div className="loading-container">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <p>BGMシステムを読み込み中...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="control-buttons">
            <button
              onClick={togglePlayback}
              className={`play-button ${isPlaying ? 'playing' : ''}`}
            >
              {isPlaying ? '一時停止' : '再生'}
            </button>

            <button onClick={toggleMute} className={`mute-button ${isMuted ? 'muted' : ''}`}>
              {isMuted ? 'ミュート解除' : 'ミュート'}
            </button>
          </div>

          <div className="volume-control">
            <div className="volume-label">
              <label>音量:</label>
              <span>{volume} dB</span>
            </div>
            <input
              type="range"
              min="-60"
              max="0"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>

          <div className="track-selection">
            <h3>トラックを選択:</h3>
            <div className="track-grid">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(track.id)}
                  className={`track-button ${currentTrack === track.id ? `active ${track.color}` : ''}`}
                >
                  <div className="track-name">{track.name}</div>
                </button>
              ))}
            </div>
          </div>

          {activeTrack && (
            <div className="current-track">
              <div className="track-info">
                <div className={`pulse-dot ${activeTrack.color}`}></div>
                <div className="current-track-name">現在再生中: {activeTrack.name}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
