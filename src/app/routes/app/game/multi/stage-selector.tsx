import { paths } from "@/config/paths";
import { useNavigate } from "react-router-dom";
import { odai } from "@/features/game/multi/datas/stages";
import { useRoom } from "@/hooks/useRoom";
import { useAuth } from "@/hooks/useAuth";
import { WaitingSelect } from "@/features/game/multi/waitingSelect";
import { useEffect, useState } from "react";
import { client } from "@/lib/schemes";

const MultiStageSelectRoute = () => {
    const [stageSelected, setStageSelected] = useState(false)
    const navigate = useNavigate();
    const { storagesRoom } = useRoom();
    const getRandomId = () => Math.floor(Math.random() * 21) + 1;

    const roomId = storagesRoom?.id

    const handleNavigate = async (path: string) => {
        if (!roomId) return; 

        const {data,errors} = await client.models.Room.update({
            id: roomId,
            stageSelected: true,
        })
        if (errors) {
            console.error("選択できていません\n", errors)
        }
        if (data) {
            console.log(data)
            navigate(path);
        }
    };

    const { data } = useAuth();
    const user = data?.name ?? "";
    const userRole = storagesRoom?.members?.find(
        (member) => member?.username === user
    )?.role ?? "";


    // stageSelectedを監視
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
              if (room.stageSelected === true) {
                setStageSelected(true);
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
        console.log("useState\n",stageSelected)
        if (stageSelected === false) return
        navigate(paths.game.multi.play.getHref());
        
      }, [stageSelected, navigate]);
    
    

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            {userRole === "host" ? (
                <>
                    <h2>お題を選択してください</h2>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ marginBottom: "10px" }}>
                            <button
                                onClick={() => handleNavigate(paths.game.multi.play.getHref(String(getRandomId())))}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                    border: "1px solid #333",
                                    background: "#f8f8f8",
                                }}
                            >
                                ランダム
                            </button>
                        </li>
                        {odai.map((item) => (
                            <li key={item.id} style={{ marginBottom: "10px" }}>
                                <button
                                    onClick={() => handleNavigate(paths.game.multi.play.getHref(item.id))}
                                    style={{
                                        padding: "10px 20px",
                                        fontSize: "16px",
                                        cursor: "pointer",
                                        borderRadius: "5px",
                                        border: "1px solid #333",
                                        background: "#f8f8f8",
                                    }}
                                >
                                    {item.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => handleNavigate(paths.top.path)}
                        style={{
                            marginTop: "20px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            cursor: "pointer",
                            borderRadius: "5px",
                            border: "1px solid #333",
                            background: "#e0e0e0",
                        }}
                    >
                        Topへ
                    </button>
                </>
            ) : (
                <WaitingSelect />
            )}
        </div>
    );
};

export default MultiStageSelectRoute;
