import {  useState } from "react";
import ChatInput from "../../../components/ChatInput";
import useSpeechToText from "../../../hooks/useSpeechToText";

const Chat = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; time: Date }[]>([]);
  const [input, setInput] = useState("");

  const { listening, startListening, stopListening } = useSpeechToText({
    onResult: (text) => {
      setInput((prev) => prev + " " + text);
    },
  }); 

  // 💬 Send Message
  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, {   text: input, isUser: true, time: new Date() }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 rounded shadow">
      
      {/* 🧾 Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
  {messages.map(({ text, isUser, time }, i) => (
    <div
      key={i}
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`flex flex-col max-w-[70%] p-3 rounded shadow w-fit ${
            isUser
              ? "bg-blue-100 "
              : "bg-white "
          }`}>
        
        {/* Message Bubble */}
        
          {text}
        

        {/* Time */}
        <span
          className={`text-xs mt-1 ${
            isUser ? "text-right " : "text-left "
          }`}
        >
          { time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
        </span>
      </div>
    </div>
  ))}
</div>

      {/* ✏️ Input Section */}
      <ChatInput 
        listening={listening}
        text={input}
        setText={setInput}
        startListening={startListening}
        stopListening={stopListening}
        onSend={sendMessage}
      />
    </div>
  );
};

export default Chat;