import './App.css' 
import { BrowserRouter,Routes,Route } from "react-router-dom"
import ChatLayout from './layouts/ChatLayout'
import ChatPage from "./pages/ChatPage"
import HomePage from "./pages/HomePage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />

        <Route path="/chat" element={<ChatLayout />}>
          <Route path=":chatId" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
