import { API } from 'aws-amplify/api';
import { useState } from 'react';

type Message = {
    send_user: string
    message: string
}

const ChatApp = () => {
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');
  const [userId, ] = useState('');
  const [messages, ] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const createRoom = async () => {
    await API.post('chatApi', '/createRoom', { body: { roomId, password } });
  };

  const joinRoom = async () => {
    await API.post('chatApi', '/joinRoom', { body: { roomId, password, userId } });
  };

  const sendMessage = async () => {
    await API.post('chatApi', '/sendMessage', { body: { roomId, userId, message } });
  };

  return (
    <div>
      <h2>チャットアプリ</h2>
      <input type="text" placeholder="Room ID" onChange={(e) => setRoomId(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={createRoom}>部屋を作成</button>
      <button onClick={joinRoom}>参加する</button>

      <input type="text" placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>送信</button>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.send_user}: {msg.message}</p>
        ))}
      </div>
    </div>
  );
};

export default ChatApp;
