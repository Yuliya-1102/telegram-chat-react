import React, { useState } from "react";

function LoginForm({ setToken, setRecipientId }) {
  const [localToken, setLocalToken] = useState("8860001584:AAHfJcUUv9YJMnEQiZqhZ7C4SXRYLn_sMno");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setToken(localToken);
    setRecipientId(recipient);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Telegram Chat Login</h2>
      <input
        type="text"
        placeholder="Bot Token"
        defaultValue={localToken}
      />
      <input
        type="text"
        placeholder="Recipient Chat ID"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <button type="submit">Start Chat</button>
    </form>
  );
}

export default LoginForm;




