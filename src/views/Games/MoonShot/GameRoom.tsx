import React, {useEffect, useState} from 'react';
import { Divider } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import { Tabs, Input, Button } from 'antd';
import { DeleteFilled } from "@ant-design/icons";
import { Auto } from './Auto';
import {MultiplierRocket} from "../../../components/Games/MoonShot/MultiplierRocket";
import { RocketAnimation } from '../../../components/Games/MoonShot/RocketAnimation';

const { TabPane } = Tabs;

export const GameRoom = () => {
  const [bet, setBet] = useState('')
  const [payout, setPayout] = useState('')
  const [currency, setCurrency] = useState('dolar')
  const onBetChange = (e: any) => {
    setBet(e.currentTarget.value)
    setPayout(e.currentTarget.value)
  }
  const onPayoutChange = (e: any) => {
    setPayout(e.currentTarget.value)
    setBet(e.currentTarget.value)
  }
  return (
    <div style={{backgroundColor:'var(--game-back-gray)', borderRadius:'1em', height:'100%', textAlign:'center'}}>
       <MultiplierRocket />
      {/*<RocketAnimation />*/}
      {/*<div style={{fontSize:'2em', color:'white', backgroundColor:'var(--off-black)', borderRadius:'0.5em', padding:'0.2em', margin:'0.8em', textAlign:'center'}}>*/}
      {/*  1.15&times;*/}
      {/*</div>*/}
      <Divider style={{margin:0}}/>
      <div style={{}}>
        <Tabs defaultActiveKey="1" className="game-moonshot__room__tabs">
          <TabPane tab="Manual" key="1" style={{padding:'1em'}}>
            <div style={{display:'flex', margin:'1em 0', flexDirection:'column'}}>
              <label style={{margin:'0.5em', textAlign:'left'}}>Bet</label>
              <div style={{height:'3em', backgroundColor:'var(--off-black)', display:'flex', alignItems:'center', borderRadius:'0.6em', overflow:'hidden'}}>
                <Input className="game-moonshot__input" value={bet} onChange={onBetChange} />
                <div style={{cursor:'pointer', height:'100%', display:'flex', alignItems:'center'}}>
                { currency === 'dolar' &&
                  <>
                    <span style={{padding:'0.5em 1em', backgroundColor:'var(--game-blue)'}} onClick={()=>{setCurrency('dolar')}}>$</span>
                    <span style={{padding:'0.5em 1em'}} onClick={()=>{setCurrency('usdc')}}>USDC</span>
                  </>
                }
                { currency === 'usdc' &&
                  <>
                    <span style={{padding:'0.5em 1em',}} onClick={()=>{setCurrency('dolar')}}>$</span>
                    <span style={{padding:'0.5em 1em', backgroundColor:'var(--game-blue)'}} onClick={()=>{setCurrency('usdc')}}>USDC</span>
                  </>
                }
                </div>
              </div>
            </div>
            <div style={{display:'flex', margin:'1em 0', flexDirection:'column'}}>
              <label style={{margin:'0.5em', textAlign:'left'}}>Payout</label>
              <div style={{height:'3em', backgroundColor:'var(--off-black)', display:'flex', alignItems:'center', borderRadius:'0.6em'}}>
                <Input className="game-moonshot__input" value={bet} onChange={onPayoutChange} />
                <DeleteFilled style={{padding:'0.8em', height:'100%', display:'flex', alignItems:'center', fontSize:'1.2em',color:'gray', borderLeft:'1px solid #303030'}}/>
              </div>
            </div>
            <div style={{margin:'1.5em 0'}}>
              <Button style={{width:'100%', padding:'1.5em', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'0.6em', backgroundColor:'var(--game-blue)', border:'none'}}>
                Bet
              </Button>
            </div>
            <div style={{textAlign:'left', margin:'1em 0.5em'}}>
              <span style={{color:'gray'}}>Target profit: </span> 0 bits
            </div>
          </TabPane>
          <TabPane tab="Auto" key="2">
            <Auto />
          </TabPane>
        </Tabs>

      </div>

    </div>

  )
}
