import { generateClient } from "aws-amplify/api";
import type { Schema } from "@/../amplify/data/resource";
import { useQuery } from "@tanstack/react-query";
import { RoomType } from "@/types/api";

const client = generateClient<Schema>({
  authMode: "userPool",
});



// **Room データを取得するカスタムフック**
export const useRooms = () => {
  return useQuery<RoomType[]>({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data: roomData, errors } = await client.models.Room.list();

      console.error(errors)
      if (errors) {
        throw new Error(`Room取得エラー: ${errors}`);
      }

      // **型の修正: `null` の可能性を排除**
      return (
        roomData?.map((room): RoomType => ({
          room_id: room.room_id,
          password: room.password ?? "", 
          messages:
            room.messages?.map((m) => ({
              room_id: m?.room_id ?? room.room_id,
              message: m?.message ?? "",
              send_user: m?.send_user ?? "Unknown",
            })) ?? [], 
          members:
            room.members?.map((m) => ({
              room_id: m?.room_id ?? room.room_id,
              username: m?.username ?? "Unknown",
            })) ?? [], 
        })) ?? []
      );
    },
  });
};
