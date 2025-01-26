import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "@/../amplify/data/resource";
import { useAuth } from "@/hooks/useAuth";

const client = generateClient<Schema>({
  authMode: "userPool",
});

export const useRoom = () => {
  const [rooms, setRooms] = useState<Schema["Room"]["type"][]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: authData } = useAuth();

  // 部屋を取得
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data: roomData, errors } = await client.models.Room.list({});
        if (errors) {
          throw new Error(`Room取得エラー: ${errors}`);
        }
        setRooms(roomData || []);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "不明なエラーが発生しました。");
      }
    };
    fetchRooms();
  }, []);


  // 部屋を作成または参加
  const handleCreateOrJoinRoom = async (password: string) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 既存の部屋を検索
      const { data: recruitments, errors } = await client.models.Recruitment.list({
        filter: {
          password: { eq: password },
          isRecruiting: { eq: true },
        },
      });
      if (errors) {
        throw new Error(`Recruitment取得エラー: ${errors}`);
      }

      if (recruitments && recruitments.length > 0) {
        
        //createdAtを昇順に
        const sortedRecruitments = recruitments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        const roomId = sortedRecruitments[0].id;
        const { data: room, errors: roomErrors } = await client.models.Room.get({ id: roomId });
        if (roomErrors) {
          throw new Error(`Room取得エラー: ${roomErrors}`);
        }


        // メンバーを追加
        if (room) {
          const updatedRoom = await client.models.Room.update({
            id: room.id,
            members: [...(room.members || []), authData?.name || "ゲスト"],
          });
          console.log("既存の部屋に参加しました。", updatedRoom);
        }
      } else {
        // 新規部屋作成
        const newRecruitment = await client.models.Recruitment.create({
          password,
          user: authData?.name || "ゲスト",
          isRecruiting: true,
        });

        const newRoom = await client.models.Room.create({
          members: [authData?.name || "ゲスト"],
          id: newRecruitment.data?.id,
        });
        console.log("新しい部屋を作成しました。", newRoom);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "エラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    rooms,
    isSubmitting,
    error,
    handleCreateOrJoinRoom,
  };
};
