import { Input } from 'antd'
import { SearchOutlined, CloseOutlined } from "@ant-design/icons"
import { ReloadButton } from './ReloadButton'
import { useMediaQuery } from '../../utils/utils';

type SeasonHeaderProps = {
  seasonName?: string,
  value: string,
  onChange: any,
  refetch: any
}

export const SeasonHeader = ({ seasonName, value, onChange, refetch, ...props }: SeasonHeaderProps) => {
  const isMobile = useMediaQuery('(max-width: 400px)');
  return (
    <div style={style.wrapper} {...props}>
      <h1 className="season_sports_name">{seasonName}</h1>
      <div className="balance-container">
        <ReloadButton refetch={refetch} />
        <Input  
            style={style.input}
            placeholder={"Search for bets"} prefix={<SearchOutlined />}
            suffix={!isMobile ? <CloseOutlined onClick={() => onChange('')} /> : <></>}
            value={value}
            onChange={(event) => onChange(event.currentTarget.value)} />
      </div>
    </div>
    )
};

const style = {
  wrapper: {
    display:'flex', 
    justifyContent:'space-between', 
    alignItems:'center',
    padding: '0 16px 0 13px'
  },
  input: {
    border:"0px", 
    padding:"1em", 
    marginTop:"1px", 
    outline:"1px solid #1f1f1f", 
    height:"40px", 
    width:"15vw"
  }
}