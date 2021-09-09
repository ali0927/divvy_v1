import { Input } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import { ReloadButton } from './ReloadButton'

export const SeasonHeader = (props: { seasonName: string | undefined, onChange: any, refetch: any }) => {
    return (
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>{props.seasonName}</h1>
        <div className="balance-container">
        <ReloadButton refetch={props.refetch} />
        <Input  
            style={{border:"0px", padding:"1em", marginTop:"1px", outline:"1px solid #1f1f1f", height:"40px", width:"15vw"}}
            placeholder={"Search for bets"} prefix={<SearchOutlined />}
            onChange={(event) => props.onChange(event.currentTarget.value)} />
        </div>
      </div>
    )
};
