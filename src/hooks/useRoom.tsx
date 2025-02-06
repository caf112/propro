import { useQuery } from "@tanstack/react-query"
import type { Schema } from "@/../amplify/data/resource";
import { generateClient } from "aws-amplify/api";


const client = generateClient<Schema>({
  authMode: "userPool",
});

export const useRoom = () => {

    //ユーザー情報を取得
    const roomQuery = useQuery ({
        queryKey: ["room"], 
        queryFn: async () => {
          const searchRoom = 1
          const { data: getRoom, errors } = await client.models.Room.get({
            room_id: searchRoom
          })
          // console.log("getData\n",getRoom)
          if (errors) {
            throw new Error(`Failed to fetch stages: ${errors}` )
          }
          
          return getRoom
        },
        // refetchInterval: 5000,

    })

    
    
    
    
    return {
      currentRoom: roomQuery.data,
      error: roomQuery.error,
      refetch: roomQuery.refetch,
      isLoading: roomQuery.isLoading,

    }
}