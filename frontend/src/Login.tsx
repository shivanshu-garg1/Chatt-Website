import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (name.trim() && room.trim()) {
      localStorage.setItem("name", name);
      localStorage.setItem("room", room);
      navigate("/chat");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96 border border-gray-700 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-blue-400">Join a Chat Room</h2>
        
        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">Your Name:</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-300 font-medium">Room ID:</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>

        <button
          onClick={handleJoin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition duration-200 shadow-lg"
        >
          Join Now
        </button>
      </div>
    </div>
  );
}
