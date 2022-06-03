import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import ChatPage from "./Components/ChatPage/ChatPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
