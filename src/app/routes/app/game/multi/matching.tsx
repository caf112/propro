import { paths } from "@/config/paths"
import { JoinRoom } from "@/features/recruit-member/join"
import { CreateRoom } from "@/features/recruit-member/recruit"
import { RecruitMember } from "@/features/recruit-member/room-stream"
import { client } from "@/lib/schemes"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const MatchingRoute = () => {
  const [mode, setMode] = useState("select")
  const [roomId, setRoomId] = useState<string>("")
  const [recruitState, setRecruitState] = useState<boolean>(true)
  const navigate = useNavigate()
  
  const handleNavigate = (path: string) => {
    navigate(path)
  }
  const handleChangeState = (value: string) => {
    setMode(value)
  }

  // 募集を締め切る
  const handleCloseRecruitment = async () => {
    await client.models.Room.update({
      id: roomId,
      isRecruiting: false,
    })
    // if (errors) {
    //   console.error("Error\n", errors)
    //   throw new Error (`部屋をclose出来ませんでした`)
    // } 
  }
  
  // isRecruitingを監視
  useEffect(() => {
    if (!roomId) return; 

    const sub = client.models.Room.observeQuery({
      // id=roomIdのみ監視する
      filter: { id: { eq: roomId } },
    }).subscribe({
      next: (result) => {
        if (result.items.length > 0) {
          const room = result.items[0];
          if (room.isRecruiting === false) {
            setRecruitState(false);
          }
        }
      },
      // error: (err) => {
      //   console.error("Error subscribing to room:", err);
      // },
    });

    return () => sub.unsubscribe();
  }, [roomId]);

  // 締め切ったら自動でページ遷移
  useEffect(() => {
    if (recruitState === true) return
    navigate(paths.game.multi.stageSelector.getHref());
    
  }, [recruitState, navigate]);
  

  
  return (
    <div>
      {/* 選択画面 */}
      {mode === "select" && (
        <div>
          <h1>どちらを選びますか</h1>
          <button onClick={() => handleChangeState("create")}>募集する</button>
          <button onClick={() => handleChangeState("join")}>参加する</button>
        </div>
      )}

      {/* 募集画面 */}
       {mode === "create" && (
        <div>
          <h1>部屋を作る</h1>
          <CreateRoom onChangeMode={handleChangeState} setRoomId={setRoomId} />
          <button onClick={() => handleChangeState("select")}>戻る</button>
        </div>
      )}
      
      {/* 参加画面 */}
      {mode === "join" && (
        <div>
          <h1>部屋を探す</h1>
          <JoinRoom onChangeMode={handleChangeState} setRoomId={setRoomId} />
          <button onClick={() => handleChangeState("select")}>戻る</button>
        </div>
      )}

      {/* メンバーリスト */}
      {(mode === "host" || mode === "member") && (
        <div>
          <h1>メンバーリスト</h1>
          <RecruitMember roomId={roomId} />
          {mode === "host" && ( <button onClick={handleCloseRecruitment}>締め切る</button> )} 
          <button onClick={() => handleChangeState("select")}>戻る</button>
        </div>
      )}
      
      <button onClick={() => handleNavigate(paths.top.path)}>topへ</button>
      
    </div>
  )
}

export default MatchingRoute