import { Mic, Send, Square } from "lucide-react";

type ChatInputProps = {
    listening: boolean;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    startListening: () => void;
    stopListening: () => void;
    onSend: () => void;
}

const ChatInput = ({ listening, text, setText, startListening, stopListening, onSend }: ChatInputProps)=>{
    return <div className="border-t p-3 flex items-center gap-2 bg-white">
        
        {/* 🎤 Mic Button */}
        {!listening ? (
          <button
            onClick={startListening}
            className="p-2 bg-green-500 text-white rounded"
          >
            <Mic size={18} />
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="p-2 bg-red-500 text-white rounded"
          >
            <Square size={18} />
          </button>
        )}

        {/* 📝 Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="Type or speak..."
          className="flex-1 border rounded px-3 py-2 outline-none"
        />

        {/* 📤 Send */}
        <button
          onClick={onSend}
          className="p-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          <Send size={18} />
        </button>
      </div>
}

export default ChatInput;