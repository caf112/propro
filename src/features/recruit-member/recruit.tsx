import { useRoom } from "@/hooks/useRoom";
import { useState } from "react";

export const RecruitMember = () => {
  const { rooms, handleCreateOrJoinRoom, error, isSubmitting } = useRoom();
  const [newPassword, setNewPassword] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);

  const handleCreateRoom = async () => {
    await handleCreateOrJoinRoom(newPassword);
    setSubmit(true);
  };

  const handleSubmitReset = () => {
    setSubmit(false);
  };

  return (
    <div>
      <h2>メンバー募集</h2>
      {!submit ? (
        <div>
          <h3>部屋を検索</h3>
          <input
            type="text"
            placeholder="あいことば"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleCreateRoom} disabled={isSubmitting}>
            部屋を検索
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div>
          {rooms.length > 0 ? (
            <div>
              <h4>メンバーリスト</h4>
              <ul>
                {rooms.map((roomItem) =>
                  Array.isArray(roomItem.members) ? (
                    roomItem.members.map((member, index) => (
                      <li key={`${roomItem.id}-${index}`}>{member}</li>
                    ))
                  ) : (
                    <li key={roomItem.id}>{roomItem.members}</li>
                  )
                )}
              </ul>
              <button onClick={() => setSubmit(false)}>再度読み込み</button>
            </div>
          ) : (
            <div>
              <p>該当する部屋が見つかりません。</p>
              <button onClick={handleSubmitReset}>もう一度探す</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
