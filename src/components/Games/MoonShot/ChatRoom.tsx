import React, {useState, useEffect, useContext} from "react";
import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
import {io} from "socket.io-client";
import {ChatsModel} from "../../../models/games/moonshot/common";
import {MoonshotSocketContext} from "../../../contexts/moonshot-socket";

export const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<ChatsModel[]>([]);
  const socket = useContext(MoonshotSocketContext);
  const handleSend = () => {
      if(message != "") {
          socket.emit("new message", {
              name: "Shashwat",
              text: message,
              date: Date.now()
          })
      }
      setMessage("");
  }
  useEffect(() => {
      let temp = chats;
      socket.on('msg', data => {
          if(temp.length > 200) {
              temp.pop();
          }
          temp = [data, ...temp];
          setChats([ ...temp ]);
      })
      socket.on("all-msgs", data => {
          setChats([ ...data ]);
          temp = [ ...data ];
      })
  }, [socket])
  useEffect(() => {
      socket.emit("get-msgs");
  }, [])
  return (
    <div style={{position:'relative', height:'100%'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px'}}>
        <strong style={{fontSize:'1.5em'}}>Chat</strong>
      </div>
      <div style={{position:'absolute', top:'4em', bottom:'4em', padding:'10px', overflow:'scroll', width:'100%', borderTop:'1px solid var(--gray)', borderBottom:'1px solid var(--gray)'}}>
        {
          chats.map(item => (
            <p>
              <span style={{color:'var(--game-blue)'}}>{item.name}: </span>
              <span> {item.text} </span>
              <span style={{color:'grey', fontSize:'0.7em'}}> {item.date}</span>
            </p>
          ))
        }
      </div>
      <div style={{position:'absolute', bottom:'0', display:'flex', alignItems:'center', padding:'10px', width:'100%', height:'4em'}}>
        <Input placeholder="Your message:" className="game-moonshot__input" value={message} onChange={e => { setMessage(e.currentTarget.value) }} />
        <SendOutlined style={{margin:'10px', cursor:'pointer', color:'var(--game-blue)', fontSize:'1.5em'}} onClick={handleSend} />
      </div>

    </div>
  )
}
