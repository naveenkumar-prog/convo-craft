import './App.css';
import convoLogo from './assets/convologo.jpg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import convoCraftLogo from './assets/convochatImg.jpg';
import { sendMsgToOpenAi } from './openai';
import { useEffect, useRef, useState } from 'react';
import Chance from 'chance';

function App() {

  const msgEnd = useRef(null);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      text: "hi, I'm convo craft",
      isBot: true,
    }
  ]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages]);

  const handleSend = async() => {
    const res = await sendMsgToOpenAi(input);


    setMessages([
      ...messages,
      { text: input, isBot:false },
      { text: res, isBot:true }
    ])
    setInput("");
  }

  const handleEnter = async(e) => {
    if(e.key === 'Enter'){
      await handleSend();
    }
  }

  const handlQuery = async(e) => {
    const res = await sendMsgToOpenAi(e.target.value);
    setMessages([
      ...messages,
      { text: e.target.value, isBot:false },
      { text: res, isBot:true }
    ])
    setInput("")
  }

  return (
    <div className="App">
      <div className='sideBar'>
        <div className='upperSide'>

          <div className='upperSideTop'>
            <img src={convoLogo} alt='Logo' className='logo'/>
            <span className='brand'>Convo Craft</span>
          </div>
          <button className='midBtn' onClick={() => window.location.reload()}>
              <img className='addBtn' src={addBtn} alt=''/>New Chat
          </button>
          <div className='upperSideBottom'>
            <button className='query' onClick={handlQuery} value={"What is Programming ?"}><img src={msgIcon} alt='Query'/>What is Programming ?</button>
            <button className='query' onClick={handlQuery} value={"How to use an API ?"}><img src={msgIcon} alt='Query'/>How to use an API ?</button>
          </div>  
        </div>
        <div className='loweSide'>
            <div className='listItems'><img src={home} alt='Home' className='listItemsImg'/>Home</div>
            <div className='listItems'><img src={saved} alt='Saved' className='listItemsImg'/>Saved</div>
            <div className='listItems'><img src={rocket} alt='Upgrade' className='listItemsImg'/>Upgrade to Pro</div>
        </div>
      </div>
      <div className='main'>
        <div className='chats'>
          {messages.map((message, i)=> 
            <div key={i} className={message.isBot ? 'chat bot': 'chat'}>
              <img className='chatImg' src={message.isBot ? convoCraftLogo: userIcon} alt='convoCraft'/>
              <p className='txt'>{ message.text }</p>
            </div>
          )}
          <div ref={msgEnd}></div>
        </div>
        <div className='chatFooter'>
          <div className='inp'>
            <input type='text' placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=> {setInput(e.target.value)}}/><button onClick={handleSend} className='send'><img src={sendBtn} alt=''/></button>
          </div>
          <p>ConvoCraft may occasionally provide responses that are not entirely accurate or up-to-date. &copy; 2025 ConvoCraft.</p>
          </div>
      </div>
    </div>
  );
}

export default App;
