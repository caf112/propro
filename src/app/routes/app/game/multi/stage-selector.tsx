import { paths } from "@/config/paths";
import { useNavigate } from "react-router-dom";
import { odai } from "@/features/game/multi/datas/stages";
import { useRoom } from "@/hooks/useRoom";
import { useAuth } from "@/hooks/useAuth";
import { WaitingSelect } from "@/features/game/multi/waitingSelect";

const MultiStageSelectRoute = () => {
    const navigate = useNavigate();
    const { storagesRoom } = useRoom();
    const getRandomId = () => Math.floor(Math.random() * 21) + 1;

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const { data } = useAuth();
    const user = data?.name ?? "";
    const userRole = storagesRoom?.members?.find(
        (member) => member?.username === user
    )?.role ?? "";

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
