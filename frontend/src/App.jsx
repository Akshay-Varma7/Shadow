import './App.css' 
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { ContextProvider }  from "./components/Context";
import ChatLayout from './layouts/ChatLayout'
import ChatPage from "./pages/ChatPage"
import HomePage from "./pages/HomePage"

function App() {
  // SidePage
  // const [chats,setChats] = useState([]); ||context||
  // const [currChatId,setCurrChatId] = useState(null);-to reload if new ||context||
  // ChatPage
  // const { chatId } = useParams(); //local\\
  // const [messages,setMessages] = useState([]); ||context||
  // //InputBox
  // const [req,setReq] = useState(""); //local\\
  // ?
  // const [res,setRes] = useState(null); ?-reply+gif
  // ? 
  // const [create,setCreate] = useState(true);?
  return (
    <BrowserRouter>
      <ContextProvider> {/*takes children prop by m2 - as none */}
        <Routes>
          <Route path="/" element={<HomePage/>} />

          <Route path="/chat" element={<ChatLayout />}>
            <Route path=":chatId" element={<ChatPage />} />
          </Route>
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App
