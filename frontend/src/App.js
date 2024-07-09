import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./_components/auth/Login";
import SignUp from "./_components/auth/SignUp";
import Chat from "./_components/chat/Chat";
import CreateProject from "./_components/project/createProject";
import CreateTask from "./_components/project/createTask";
import AddMember from "./_components/project/addMember";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/chatRoom" element={<Chat />} />
        <Route path="/createProject" element={<CreateProject />} />
        <Route path="/createTask" element={<CreateTask />} />
        <Route path="/addMember" element={<AddMember />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
