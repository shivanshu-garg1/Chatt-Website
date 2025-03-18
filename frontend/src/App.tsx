import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ChatApp from "./ChatApp";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatApp />} />
      </Routes>
    </Router>
  );
}
