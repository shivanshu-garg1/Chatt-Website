import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatApp() {
  const [messages, setMessages] = useState<{ name: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "Anonymous";
  const room = localStorage.getItem("room") || "default-room";

  useEffect(() => {
    if (!name || !room) {
      navigate("/");
      return;
    }

    socket.emit("join_room", { name, room });

    const handleMessage = (message: { name: string; text: string }) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [name, room, navigate]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("message", { name, room, text: input });
      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col">
        <h2 className="text-xl font-bold text-center mb-4 text-blue-400">Chat Room: {room}</h2>

        <div className="flex-1 overflow-y-auto border border-gray-700 rounded-lg p-3 mb-4 bg-gray-700 shadow-inner h-96 scrollbar-thin scrollbar-thumb-gray-500">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 my-2 w-fit max-w-md rounded-lg shadow-md text-sm ${
                msg.name === name
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-600 text-gray-200"
              }`}
            >
              <strong>{msg.name}:</strong> {msg.text}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}