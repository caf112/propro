import { useState, useEffect, useRef } from 'react';

interface Track {
  id: string;
  name: string;
  color: string;
  mood: string;
  audioPath: string;
}

export const InteractiveBGMController = () => {
  // BGMトラックのデータ
  const tracks: Track[] = [
    { 
      id: 'main', 
      name: 'メインテーマ', 
      color: 'bg-blue-500', 
      mood: '通常',
      audioPath: '/audio/bgm1.mp3'
    },
    { 
      id: 'battle', 
      name: 'バトルテーマ', 
      color: 'bg-red-500', 
      mood: '激しい',
      audioPath: '/audio/bgm1.mp3'
    },
    { 
      id: 'peaceful', 
      name: '穏やかなテーマ', 
      color: 'bg-green-500', 
      mood: '穏やか',
      audioPath: '/audio/bgm1.mp3'
    },
    { 
      id: 'suspense', 
      name: 'サスペンス', 
      color: 'bg-purple-500', 
      mood: '緊張',
      audioPath: '/audio/bgm1.mp3'
    }
  ];

  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(-15);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [fadeDuration, setFadeDuration] = useState<number>(2);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  const audioRef = useRef<AudioBufferSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // オーディオコンテキストの初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new AudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
  }, []);

  // システム初期化のシミュレーション
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialized(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // BGMトラック選択
  const selectTrack = async (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track || !audioContextRef.current) return;

    try {
      if (audioRef.current) {
        audioRef.current.stop();
      }

      const response = await fetch(track.audioPath);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(gainNodeRef.current!);
      source.loop = true;
      
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(
          Math.pow(10, volume / 20),
          audioContextRef.current.currentTime + fadeDuration
        );
      }

      source.start(0);
      audioRef.current = source as any;
      setCurrentTrack(trackId);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  // 再生/一時停止の切り替え
  const togglePlayback = () => {
    if (!audioRef.current || !audioContextRef.current) return;

    if (isPlaying) {
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0,
          audioContextRef.current.currentTime + fadeDuration
        );
      }
      setTimeout(() => {
        audioRef.current?.stop();
      }, fadeDuration * 1000);
    } else {
      selectTrack(currentTrack!);
    }
    setIsPlaying(!isPlaying);
  };

  // ミュート切り替え
  const toggleMute = () => {
    if (!gainNodeRef.current || !audioContextRef.current) return;

    if (isMuted) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        Math.pow(10, volume / 20),
        audioContextRef.current.currentTime + 0.1
      );
    } else {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        0,
        audioContextRef.current.currentTime + 0.1
      );
    }
    setIsMuted(!isMuted);
  };

  // ボリューム調整
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    
    if (gainNodeRef.current && !isMuted) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        Math.pow(10, newVolume / 20),
        audioContextRef.current?.currentTime || 0 + 0.1
      );
    }
  };
  
  // フェード時間調整
  const handleFadeDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFadeDuration(Number(e.target.value));
  };
  
  // パネル展開/折りたたみの切り替え
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // 現在のトラック情報
  const activeTrack = tracks.find(t => t.id === currentTrack);

  return (
    <div className={`bg-gray-800 text-white rounded-lg shadow-lg transition-all duration-300 ${isExpanded ? 'p-6' : 'p-4'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">BGMコントローラー</h2>
        <button 
          onClick={toggleExpanded}
          className="text-gray-400 hover:text-white"
        >
          {isExpanded ? '折りたたむ ▲' : '展開する ▼'}
        </button>
      </div>
      
      {!initialized ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-2"></div>
            <p>BGMシステムを読み込み中...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={togglePlayback}
              className={`px-4 py-2 rounded font-medium ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isPlaying ? '一時停止' : '再生'}
            </button>
            
            <button 
              onClick={toggleMute}
              className={`px-4 py-2 rounded font-medium ${isMuted ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-600 hover:bg-gray-700'}`}
            >
              {isMuted ? 'ミュート解除' : 'ミュート'}
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm">音量:</label>
              <span className="text-sm">{volume} dB</span>
            </div>
            <input 
              type="range" 
              min="-60" 
              max="0" 
              value={volume} 
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {isExpanded && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm">フェード時間:</label>
                <span className="text-sm">{fadeDuration}秒</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="5" 
                step="0.5"
                value={fadeDuration} 
                onChange={handleFadeDurationChange}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium mb-2">トラックを選択:</h3>
            <div className="grid grid-cols-2 gap-2">
              {tracks.map(track => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(track.id)}
                  className={`p-3 rounded text-sm transition-all ${
                    currentTrack === track.id 
                      ? `${track.color} shadow-lg scale-105` 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-medium">{track.name}</div>
                  {isExpanded && <div className="text-xs opacity-75">雰囲気: {track.mood}</div>}
                </button>
              ))}
            </div>
          </div>
          
          {activeTrack && (
            <div className={`mt-4 pt-3 border-t border-gray-700 transition-all ${isExpanded ? 'opacity-100' : 'opacity-75'}`}>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${activeTrack.color} animate-pulse mr-2`}></div>
                <div>
                  <div className="font-medium">現在再生中: {activeTrack.name}</div>
                  {isExpanded && (
                    <div className="text-xs text-gray-400">
                      ステータス: {isPlaying ? (isMuted ? 'ミュート中' : '再生中') : '一時停止中'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
