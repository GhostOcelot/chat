import { useState } from 'react';
// import { v4 as uuidv4 } from "uuid"
import { useSocket } from '../hooks';

interface Message {
  sender: string;
  message: string;
}

const Chat = () => {
  const [chat, setChat] = useState<Message[]>([]);
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');

  const { socketRef } = useSocket({
    url: 'http://localhost:3001',
    events: [
      {
        eventName: 'message',
        eventHandler: (payload: Message) =>
          setChat((prev) => [payload, ...prev]),
      },
    ],
  });

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sender || !message) return;
    socketRef.current?.emit('message', { sender, message });
    setMessage('');
  };

  // const joinChat = () => {
  //   socketRef.current?.emit("joinRoom", uuidv4())
  // }
  return (
    <form onSubmit={sendMessage}>
      <input
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        id="name"
        placeholder="Your name"
      />
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        id="msg"
        placeholder="Your message"
      />
      <button>Send</button>
      <ul id="chat">
        {chat.map((msg, index) => (
          <li key={index}>
            {msg.sender}: {msg.message}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Chat;
