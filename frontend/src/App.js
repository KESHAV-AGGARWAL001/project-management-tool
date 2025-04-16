import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./_components/auth/Login";
import SignUp from "./_components/auth/SignUp";
import MyCalendar from "./_components/calender/Calender";
import Chat from "./_components/chat/Chat";
import AddMember from "./_components/project/addMember";
import AllTasks from "./_components/project/AllTasks";
import CreateProject from "./_components/project/createProject";
import CreateTask from "./_components/project/createTask";
import RateLimitError from "./_components/ratelimitError";
import "./App.css";
import ProtectedRoute from "./utils/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rate-limit-error" element={<RateLimitError />} />
        <Route path="/login" element={ <Login /> }  />
        <Route path="/register" element={<SignUp />} />
        <Route path="/chatRoom" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="/createProject" element={
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        } />
         <Route path="/createTask" element={
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        } />
         <Route path="/addMember" element={
          <ProtectedRoute>
            <AddMember />
          </ProtectedRoute>
        } />
        <Route path="/allTasks" element={
          <ProtectedRoute>
            <AllTasks />
          </ProtectedRoute>
        } />
        <Route path="/myCalender" element={
          <ProtectedRoute>
            <MyCalendar />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
