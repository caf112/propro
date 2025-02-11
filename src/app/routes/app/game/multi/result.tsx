import { paths } from '@/config/paths';
import { useNavigate } from 'react-router-dom';
import * as Button from '@/components/ui/button'
import { MultiCodeRunner } from '@/features/game/multi/code-runner';
import { CodeReview } from '@/features/game/multi/code-review'
import { useEffect, useState } from 'react';
import { client } from '@/lib/schemes';
import { useRoom } from '@/hooks/useRoom';

const MultiResultRoute = () => {
  const [clickReset, setClickReset] = useState(false)
  const {storagesRoom, resetBoolean} = useRoom()
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
  }
  const roomId = storagesRoom?.id

  const handleReset = async () => {
    if (!roomId) return
    try {
      await resetBoolean(roomId)
      navigate(paths.game.multi.stageSelector.getHref())
    } catch (err) {
      console.error("リセット時にエラーが発生しました:", err)
    }
  }


  // stageSelectedがリセットされたかを監視
  useEffect(() => {
      if (!roomId) return; 
  
      const sub = client.models.Room.observeQuery({
        // id=roomIdのみ監視する
        filter: { id: { eq: roomId } },
      }).subscribe({
        next: (result) => {
          if (result.items.length > 0) {
            const room = result.items[0];
            console.log("result.items[0]\n",room)
            if (room.stageSelected === false) {
              setClickReset(true);
            }
          }
        },
        error: (err) => {
          console.error("Error subscribing to room:", err);
        },
      });
  
      return () => sub.unsubscribe();
    }, [roomId]);

  // ステージを選択したら自動でページ遷移
  useEffect(() => {
    console.log("useState\n",clickReset)
    if (clickReset === false) return
    navigate(paths.game.multi.stageSelector.getHref());
    
  }, [clickReset, navigate]);



  return (
    <div>
      <MultiCodeRunner />
      <CodeReview />
      <Button.ActionButton onClick={handleReset} label="ステージ選択へ" iconClass=''/>
      <Button.ActionButton onClick={() => handleNavigate(paths.top.path)} label="トップへ" iconClass=''/>
    </div>
  )
}


export default MultiResultRoute