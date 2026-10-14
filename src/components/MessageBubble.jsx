
function MessageBubble({ message, recipientId }) {
  const isRecipient = message.from.id === parseInt(recipientId);
  return (
    <div className={`msg ${isRecipient ? "left" : "right"}`}>
      {message.text}
    </div>
  );
}

export default MessageBubble;
