import './App.css'
//react-dom vs react-router-dom
//ROUTE VS ROUTER 
import { BrowserRouter,Routes,Route } from "react-router-dom"//inside another L to R and (layout route with path has route with index one too)
import ChatLayout from './layouts/ChatLayout'
import ChatPage from "./pages/ChatPage"
import HomePage from "./pages/HomePage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />

        <Route path="/chat" element={<ChatLayout />}>
          {/* <Route index element={<SidePage />} /> stays all time */}
          <Route path=":chatId" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
//no page and path * means?
export default App
