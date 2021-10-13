import React, { useState, useEffect } from "react";
import { Divider } from 'antd';
import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";

const ChatData = new Array(20).fill({
  name: 'Burnout',
  text: 'Yo guys pls, im poor i just have 10$ for pay my current, can anyone give me a free and good script or some bits, thank u guys',
  date: '11:00 pm'
})

export const ChatRoom = () => {
  const [message, setMessage] = useState('')
  return (
    <div style={{position:'relative', height:'100%'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px'}}>
        <strong style={{fontSize:'1.5em'}}>Chat</strong>
        <div>
          <img src="../us.svg" style={{width:'30px', height:'20px', margin:'auto 10px', borderRadius:'6px'}} alt="English" />
          <img src="../ru.svg" style={{width:'30px', height:'20px', borderRadius:'6px'}} alt="Russian" />
        </div>
      </div>
      <div style={{position:'absolute', top:'4em', bottom:'4em', padding:'10px', overflow:'scroll', width:'100%', borderTop:'1px solid var(--gray)', borderBottom:'1px solid var(--gray)'}}>
        {
          ChatData.map(item => (
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
        <SendOutlined style={{margin:'10px', color:'var(--game-blue)', fontSize:'1.5em'}}/>
        <Divider type="vertical" style={{height:'1.5em', margin:'0'}}/>
        <strong style={{margin:'10px', fontSize:'1.2em', color:'var(--game-blue)'}}>LN</strong>
      </div>
    
    </div>
  )
}