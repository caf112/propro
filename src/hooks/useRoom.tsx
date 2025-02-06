import { useQuery } from "@tanstack/react-query"
import type { Schema } from "@/../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useAuth } from "./useAuth";


const client = generateClient<Schema>({
  authMode: "userPool",
});

export const useRoom = () => {

    //searchRoomが2の部屋情報を取得
    const roomQuery = useQuery ({
        queryKey: ["room"], 
        queryFn: async () => {
          const searchRoom = 3
          const { data: getRoom, errors } = await client.models.Room.get({
            room_id: searchRoom
          })
          // console.log("getData\n",getRoom)
          if (errors) {
            throw new Error(`Failed to fetch stages: ${errors}` )
          }
          
          return getRoom
        },
        //リクエスト数がえげつないことになる
        // refetchInterval: 5000,
    })

    const createRoom = async (password: string, username: string) => {

      // roomListのroom_idとmaxIdを比較して入れ替える
      const {data: roomList} = await client.models.Room.list()
      if (!roomList) return
      let maxId = 0;
      roomList.forEach(room => {
        if (room.room_id > maxId) {
          maxId = room.room_id
        }
      })
      const nextRoomId = maxId + 1

      // passwordを入れる
      const inputPassword = password

      // useAuthからusernameを取得
      const createUser = username
      const { data: newRoom, errors} = await client.models.Room.create({
        room_id: nextRoomId,
        password: inputPassword,
        members: [{
          room_id: nextRoomId,
          username: createUser,
          member_count: 1 
        }]
      })

      if (errors) {
        throw new Error(`Failed to fetch stages: ${errors}` )
      } else {
        console.log("部屋を作りました\n",newRoom)
      }
    }
    
    return {
      currentRoom: roomQuery.data,
      error: roomQuery.error,
      refetch: roomQuery.refetch,
      isLoading: roomQuery.isLoading,
      createRoom,
    }
}