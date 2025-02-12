import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/components/ui/loader";
import { useRoom } from "@/hooks/useRoom";
import { client } from "@/lib/schemes";
import { paths } from "@/config/paths";


export const RecruitMember = ({ roomId }: { roomId?: string }) => { 
    localStorage.getItem("roomId");
    
  
    // roomId を localStorage に保存
    useEffect(() => {
      if (roomId !== undefined) {
        localStorage.setItem("roomId", roomId);
      }
    }, [roomId]);

    const navigate = useNavigate()   
    const { currentRoom, isLoading, refetch } = useRoom(roomId);

    // console.error("RecruitMemberのerror\n", error)

    useEffect(() => {
        // observeQuery でリアルタイムデータを監視
        const sub = client.models.Room.observeQuery().subscribe(({
            next: () => {
                refetch()
            }
        }));
    
        return () => sub.unsubscribe(); 
    }, []);
    
    const handleNavigatePages = (path: string) => {
        navigate(path)
    }

    const getPlayerIcon = (index: number) => {
        const playerNumber = (index % 4) + 1
        return `/assets/${playerNumber}p.png`;
    }
      

  return (
    <div>
        {!isLoading ? (
            <div>
                <button onClick={() => refetch()}>Refresh</button>
                <p><strong>あいことば:</strong><br/><span style={{ border: '1px solid #000', padding: '2px 5px' }}>{currentRoom?.password}</span></p>

                {currentRoom ? (
                    <div>
                        <ul>
                            {currentRoom.members?.map((member, index) => (
                                <li 
                                    key={member?.username} 
                                    style={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        gap: "10px", 
                                        marginBottom: "10px" 
                                    }}
                                >
                                    <img 
                                        src={getPlayerIcon(index)} 
                                        alt={`P${index + 1}`} 
                                        width={45} 
                                        height={45} 
                                        style={{ 
                                            border: "2px solid #000", 
                                            borderRadius: "50%", 
                                            padding: "1px", 
                                            backgroundColor: "#fff"
                                        }} 
                                    />
                                    <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                                        {member?.username}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>メンバーはいません</p>
                )}
                <button onClick={() => handleNavigatePages(paths.game.modeSelector.getHref())}>モード選択へ</button>
            </div>
        ) : (
            <Loader />
        )}
    </div>
  );
};

