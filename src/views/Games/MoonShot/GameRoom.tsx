import { Divider } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';

export const GameRoom = () => {
  return (
    <div style={{backgroundColor:'var(--game-back-gray)', borderRadius:'1em', height:'100%', textAlign:'center'}}>
      <img src="../hodl.svg" style={{width:'65%', margin:'4em auto'}} alt="hodl" />
      <div style={{fontSize:'2em', color:'white', backgroundColor:'var(--off-black)', borderRadius:'0.5em', padding:'0.2em', margin:'0 0.8em', textAlign:'center'}}>
        1.15&times;
      </div>
      <Divider />
      <div style={{margin:'10em auto', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <CaretRightFilled style={{fontSize:'3.6em', color:'var(--game-blue)'}}/>
        <a href="#" style={{color:'var(--game-blue)'}}>Login</a>
        &nbsp;or&nbsp;
        <a href="#" style={{color:'var(--game-blue)'}}>register</a>
        &nbsp;to start playing
      </div>

    </div>

  )
}