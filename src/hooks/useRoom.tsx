import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "@/../amplify/data/resource";
import { useAuth } from "@/hooks/useAuth";

const client = generateClient<Schema>({
  authMode: "userPool",
});

type RoomType = {
  id: string,
  members: string[],
}

export const useRoom = () => {
  const [room, setRoom] = useState<RoomType>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>(""); 
  const [recruiting, setRecruiting] = useState<boolean>(true)
  const { data: authData } = useAuth();

  useEffect(() => {
    //重複をなくす(createRoom時も)
    const fetchRooms = async () => {
      if (!password) {
        console.log("パスワードがありません。")
        return; 
      }

      try {
        const { data: recruitments, errors } = await client.models.Recruitment.list({
          filter: {
            isRecruiting: { eq: true },
            password: { eq: password },
          },
        });
        console.log("recruiments\n",recruitments)
        if (errors) {
          throw new Error(`Recruitment取得エラー: ${errors}`);
        }

        if (recruitments && recruitments.length > 0) {
          const roomPromises = recruitments.map((recruitment) =>
            client.models.Room.get({ id: recruitment.id })
          );
          const roomResults = await Promise.all(roomPromises);

          const validRooms = roomResults //valid = 有効
            .filter((result) => !!result.data && !result.errors) 
            .map((result) => result.data)

            
            //ひとまずconsole.logで確認
            //これを実装しないと、自動でuserを取得できない
            console.log("validRooms\n",validRooms)
            // if (validRooms.length > 0) {
            //   setRoom(validRooms[0])
            // } else {
            //   setRoom(undefined)
            // }

          // setRoom(validRooms); 
        } else {
          setRoom(undefined);
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "エラーが発生しました。");
      }
    };

    fetchRooms();
  }, [password]); 


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
        // createdAtを昇順に
        const sortedRecruitments = recruitments.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        const roomId = sortedRecruitments[0].id;
        const { data: room, errors: roomErrors } = await client.models.Room.get({ id: roomId });
        if (roomErrors) {
          throw new Error(`Room取得エラー: ${roomErrors}`);
        }

        // メンバーを追加
        if (room) {
          const updateMembers = Array.from(
            new Set([...(room.members || []), authData?.name || "ゲスト"])
          )
          
          const updatedRoom = await client.models.Room.update({
            id: room.id,
            members: updateMembers
          });

          if (updatedRoom.data && Array.isArray(updatedRoom.data.members)) {
            setRoom({
              id: updatedRoom.data.id || "",
              members: updatedRoom.data.members as string[],
            });
          }
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

        // setRoom({
        //   id: newRoom.data?.id || "",
        //   members: newRoom.data?.members || [],
        // });
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "エラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  }

  // isRecruitmentをfalseにする
  const closeRecruitment = async (recruitmentId: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const { data: updatedRecruitment, errors } = await client.models.Recruitment.update({
        id: recruitmentId,
        isRecruiting: false,
      });
      setRecruiting(false)

      if (errors) {
        throw new Error(`Recruitment更新エラー: ${errors}`);
      }

      console.log("募集を終了しました。", updatedRecruitment);


      if (room && room.id === recruitmentId) {
        setRoom(undefined)
      }
      
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "エラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    room,
    isRecruiting: recruiting,
    isSubmitting,
    error,
    handleCreateOrJoinRoom,
    closeRecruitment,
    setPassword, 
  };
};
