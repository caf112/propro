import { paths } from "@/config/paths";
import { useRoom } from "@/hooks/useRoom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RecruitMember = () => {
  const { room, handleCreateOrJoinRoom, closeRecruitment, error, isSubmitting } = useRoom();
  const [newPassword, setNewPassword] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const navigate = useNavigate()

  const handleCreateRoom = async () => {
    await handleCreateOrJoinRoom(newPassword);
    setSubmit(true);
  };

  const handleSubmitReset = () => {
    setSubmit(false);
  };

  const handleCloseRecruitment = async (roomId: string) => {
    await closeRecruitment(roomId);
    setSubmit(false); // 部屋を立て直しモードに戻す
  };

  const handleStageRoute = () => {
    navigate(paths.game.multi.stageSelector.getHref())
  }

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
          {room ? (
            <div>
              <h4>メンバーリスト</h4>
              <ul>
                {room.members.map((member, index) => (
                  <li key={`${room.id}-${index}`}>{member}</li>
                ))}
              </ul>
              <button onClick={() => setSubmit(false)}>部屋を立て直す</button>
              <button
                onClick={() => {
                  if (room?.id) {
                    handleCloseRecruitment(room.id); 
                  } else {
                    console.error("部屋のIDが見つかりません。");
                  }
                  handleStageRoute()
                }}
                disabled={isSubmitting}
              >
                募集を終了する
              </button>

            </div>
          ) : (
            <div>
              <p>該当する部屋が見つかりません。</p>
              <button onClick={handleSubmitReset}>もう一度探す</button>
              <button
                onClick={() => {
                  handleStageRoute()
                }}
                disabled={isSubmitting}
              >
                募集を終了する
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
