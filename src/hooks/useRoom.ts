import { useQuery } from "@tanstack/react-query"
import { client } from "@/lib/schemes"
import { UUID } from "@/utils/uuid"

export const useRoom = (roomId?: string) => {

    //searchRoomがの部屋情報を取得
    const roomQuery = useQuery ({
        queryKey: ["room", roomId], 
        queryFn: async () => {
          if(!roomId) {
            throw new Error(`部屋が見つかりません`)
          }

          // searchRoomに現在の部屋のroom_idを入れる
          const searchRoomId = roomId
          console.log("searchRooomId\n",searchRoomId)
          if (!searchRoomId) throw new Error(`部屋が見つかりません`)
          if (searchRoomId) {
            const { data: getRoom, errors } = await client.models.Room.get({
              id: searchRoomId
            })
            console.log("getData\n",getRoom)
            if (errors) {
              throw new Error(`Failed to fetch Room: ${errors}` )
            }

            return getRoom
          }
        }

        //リクエスト数がえげつないことになる
        // refetchInterval: 5000,
    })



    //searchRoomが2の部屋情報を取得
    const storedRoomId = localStorage.getItem("roomId")
    const initialRoomId = storedRoomId ? storedRoomId : undefined
    const storageRoomQuery = useQuery ({
      queryKey: ["room", initialRoomId], 
      queryFn: async () => {
        if(!initialRoomId) {
          throw new Error(`部屋が見つかりません`)
        }

        // searchRoomに現在の部屋のidを入れる
        const searchRoomId = initialRoomId
        if (!searchRoomId) throw new Error(`部屋が見つかりません`)
        if (searchRoomId) {
          const { data: getRoom, errors } = await client.models.Room.get({
            id: searchRoomId
          })
          // console.log("getData\n",getRoom)
          if (errors) {
            throw new Error(`Failed to fetch stages: ${errors}` )
          }

          return getRoom
        }
      }

      //リクエスト数がえげつないことになる
      // refetchInterval: 5000,
  })


    const createRoom = async (password: string, username: string) => {

      // roomListのroom_idとmaxIdを比較して入れ替える
      const {data: roomList} = await client.models.Room.list()
      if (!roomList) return

      // passwordを入れる
      const inputPassword = password

      // useAuthからusernameを取得
      const createUser = username

      // Roomを作成
      const createId = UUID()
      const { data: newRoom, errors} = await client.models.Room.create({
        id:createId,
        password: inputPassword,
        isRecruiting: true,
        members: [{
          id: UUID(),
          room_id: createId,
          username: createUser,
        }],
        member_count: 1 //一人目
      })

      if (errors) {
        throw new Error(`Failed to create room: ${errors}` )
      } 

      console.log("部屋を作りました\n",newRoom)
      return createId

    }

    // passwordが同じ部屋に参加
    const joinRoom = async (password: string ,username: string) => {
      const inputPassword = password
      
      const {data: roomList, errors: getRoomErrors} = await client.models.Room.list()
      console.log("getRoomErrors\n",getRoomErrors)
      if (getRoomErrors) {
        throw new Error(`Failed to fetch rooms: ${getRoomErrors}` )
      }

      // passwordが同じ部屋を探す
      const matchRoom = roomList.find(room => room.password === inputPassword)
      if (matchRoom) {
        const matchRoomId = matchRoom?.id
        const matchMember_count = matchRoom.member_count || 4
        const matchMembers = matchRoom.members || []
        if (matchMember_count >= 4) {
          throw new Error(`部屋が満員です`)
        }

        const joinUser = username

        const isAlreadyJoined = matchMembers.some(member => member?.username === joinUser)
        if (isAlreadyJoined) {
          console.log("部屋に復帰しました\n", isAlreadyJoined)
        } else {

          const updatedmembers = [
            ...matchMembers,
            {
              id: UUID(),
              room_id: matchRoomId,
              username: joinUser,
            }
          ]
          
          // ヒットした部屋に参加する
          const {data: addMember, errors: matchingErrors} = await client.models.Room.update({
            id:matchRoomId,
            members: updatedmembers,
            member_count: matchMember_count + 1,
          })
          
          if (matchingErrors) {
            throw new Error(`Failed to join room: ${matchingErrors}` )
          }
          
          console.log("部屋に参加しました\n", addMember)
        }
        return matchRoomId
      }
      

    }
    
    return {
      currentRoom: roomQuery.data,
      storagesRoom: storageRoomQuery.data,
      error: roomQuery.error ||storageRoomQuery.error,
      refetch: roomQuery.refetch ||storageRoomQuery.refetch,
      isLoading: roomQuery.isLoading || storageRoomQuery.isLoading,
      createRoom,
      joinRoom,
    }
}