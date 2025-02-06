import { Loader } from "@/components/ui/loader";
import { useRoom } from "@/hooks/useRoom";
import { useEffect } from "react";
import type { Schema } from "@/../amplify/data/resource";
import { generateClient } from "aws-amplify/api";

const client = generateClient<Schema>({
  authMode: "userPool",
});

export const RoomList = () => {    
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
    
      

  return (
    <div>
        {!isLoading ? (
            <div>
                <h1>Room List</h1>
                <button onClick={() => refetch()}>Refresh</button>
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
            </div>
        ) : (
            <Loader />
        )}
    </div>
  );
};

