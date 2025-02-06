import { Loader } from "@/components/ui/loader";
import { useRoom } from "@/hooks/useRoom";
import { useEffect } from "react";
import type { Schema } from "@/../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

const client = generateClient<Schema>({
  authMode: "userPool",
});

export const RecruitMember = () => { 
    const navigate = useNavigate()   
    const { currentRoom, isLoading, error, refetch } = useRoom();
    if(currentRoom) {
        console.log("currentRoom\n",currentRoom)
    }
    if (error) {
        console.log("error\n",error)
    }
    
    useEffect(() => {
        // observeQuery でリアルタイムデータを監視
        const sub = client.models.Room.observeQuery().subscribe(({
            next: () => {
                refetch()
                console.log("refetch後\n",currentRoom)
            }
        }));
    
        return () => sub.unsubscribe(); 
    }, []);
    
    const handleModeSelectPage = () => {
        navigate(paths.game.modeSelector.getHref())
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
                        <p>{currentRoom.room_id}</p>
                        <ul>
                            {currentRoom.members?.map((member) => (
                                <li key={member?.username}>{member?.username}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>メンバーはいません</p>
                )}
                <button onClick={handleModeSelectPage}>モード選択へ</button>
            </div>
        ) : (
            <Loader />
        )}
    </div>
  );
};

