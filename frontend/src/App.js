import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./_components/auth/Login";
import SignUp from "./_components/auth/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
