import { useRooms } from "@/hooks/useRooms";

export const RoomList = () => {
  const { data: rooms, error, refetch } = useRooms();

  return (
    <div>
      <h1>Room List</h1>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <button onClick={() => refetch()}>Refresh</button>
      <ul>
        {rooms?.map((room) => (
          <li key={room.room_id}>
            <strong>Room ID:</strong> {room.room_id}
            <br />
            <strong>Members:</strong> {room.members.map((m) => m.username).join(", ")}
            <br />
            <strong>Messages:</strong> {room.messages.map((m) => m.message).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

