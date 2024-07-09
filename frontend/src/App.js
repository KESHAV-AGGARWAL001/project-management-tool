import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./_components/auth/Login";
import SignUp from "./_components/auth/SignUp";
import MyCalendar from "./_components/calender/Calender";
import Chat from "./_components/chat/Chat";
import AddMember from "./_components/project/addMember";
import AllTasks from "./_components/project/AllTasks";
import CreateProject from "./_components/project/createProject";
import CreateTask from "./_components/project/createTask";
import "./App.css";

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
        <Route path="/allTasks" element={<AllTasks />} />
        <Route path="/myCalender" element={<MyCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
