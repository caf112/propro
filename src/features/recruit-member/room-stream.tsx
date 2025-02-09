import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/components/ui/loader";
import { useRoom } from "@/hooks/useRoom";
import { client } from "@/lib/schemes";
import { paths } from "@/config/paths";


export const RecruitMember = ({ roomId }: { roomId?: string }) => { 
    console.log("RecruitmemberのroomId\n",roomId)
    localStorage.getItem("roomId");
    
  
    // roomId を localStorage に保存
    useEffect(() => {
      if (roomId !== undefined) {
        localStorage.setItem("roomId", roomId);
        console.log("localstorage", roomId)
      }
    }, [roomId]);

    const navigate = useNavigate()   
    const { currentRoom, isLoading, error, refetch } = useRoom(roomId);

    console.log("currentRoom\n",currentRoom)
    console.error("RecruitMemberのerror\n", error)

    useEffect(() => {
        // observeQuery でリアルタイムデータを監視
        const sub = client.models.Room.observeQuery().subscribe(({
            next: () => {
                refetch()
                console.log("refetch後\n", currentRoom)
            }
        }));
    
        return () => sub.unsubscribe(); 
    }, []);
    
    const handleNavigatePages = (path: string) => {
        navigate(path)
    }
      

  return (
    <div>
        {!isLoading ? (
            <div>
                <h1>Room List</h1>
                <button onClick={() => refetch()}>Refresh</button>
                <p>あいことば:<br/>{currentRoom?.password}</p>
                {currentRoom ? (
                    <div>
                        <ul>
                            {currentRoom.members?.map((member) => (
                                <li key={member?.username}>{member?.username}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>メンバーはいません</p>
                )}
                <button onClick={() => handleNavigatePages(paths.game.multi.stageSelector.getHref())}>締め切る</button>
                <button onClick={() => handleNavigatePages(paths.game.modeSelector.getHref())}>モード選択へ</button>
            </div>
        ) : (
            <Loader />
        )}
    </div>
  );
};

