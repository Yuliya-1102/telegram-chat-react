import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function Chat({ token, recipientId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = async () => {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: recipientId, text })
    });
    const data = await res.json();

    if (data.ok) {
      setMessages(prev => [...prev, data.result]);
    }

    setText("");
  };

  const getUpdates = async () => {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
      const data = await res.json();      

      if (data.ok) {
        setMessages(prev => {
          const incoming = data.result.map(u => u.message);
          const all = [...prev, ...incoming];

          const unique = all.filter(
            (msg, index, array) =>
              index === array.findIndex(m => m.message_id === msg.message_id)
          );

          const chatId = unique.filter(msg => msg.chat.id === Number(recipientId))

          return chatId;
        });
      }      

    } catch (err) {
      console.error("Ошибка получения апдейтов:", err);
    }    
  }

  useEffect(() => {
    const interval = setInterval(getUpdates, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} recipientId={recipientId} />
        ))}
      </div>
      <div className="input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;



