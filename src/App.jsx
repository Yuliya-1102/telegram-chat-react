import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Chat from "./components/Chat";

// token: 8860001584:AAHfJcUUv9YJMnEQiZqhZ7C4SXRYLn_sMno
// https://api.telegram.org/bot8860001584:AAHfJcUUv9YJMnEQiZqhZ7C4SXRYLn_sMno/getUpdates

function App() {

  const [token, setToken] = useState("");
  const [recipientId, setRecipientId] = useState("");

  if (!token || !recipientId) {
    return <LoginForm setToken={setToken} setRecipientId={setRecipientId} />;
  }

  return <Chat token={token} recipientId={recipientId} />;
}

export default App
