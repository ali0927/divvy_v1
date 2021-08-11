import { Slider, Switch } from 'antd';
import { useMemo, useState, useEffect } from "react";

export const WalletSlider = (props: { onChange: any, value: number, disabled: boolean }) =>  {
  const [value, setValue] = useState(0)

  const marks = useMemo(() => ({
    [value]: {
      label: <small>{value}%</small>
    }
  }), [value])
  const onChangeValue = (val: number) => {
    setValue(val)
    props.onChange(val)
  }
  useEffect(() => {
    setValue(parseFloat(props.value <= 100 ? props.value.toFixed(1): '100'))
  }, [props.value])

  return (
    <div style={{position: "relative", padding:"0 5px"}}>
      <Slider marks={marks} tooltipVisible={false} onChange={onChangeValue} value={value} disabled={props.disabled} defaultValue={0} />
    </div>
  );
}
