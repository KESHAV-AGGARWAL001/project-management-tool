import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./_components/auth/Login";
import SignUp from "./_components/auth/SignUp";
import Chat from "./_components/chat/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/chatRoom" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
