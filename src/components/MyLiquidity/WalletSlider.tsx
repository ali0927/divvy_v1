import { Slider, Switch } from 'antd';
import { useMemo, useState, useEffect } from "react";

const initMarks = {
  0: { label: <small className="text-secondary">0%</small> },
  100: { label: <small className="text-secondary">100%</small> },
}

export const WalletSlider = (props: { onChange: any, label: string, value: number }) =>  {
  const [value, setValue] = useState(0)

  const marks = useMemo(() => ({
    ...initMarks,
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
    <div style={{position: "relative"}}>
      <small className="text-secondary">{props.label}:</small>
      <Slider marks={marks} tooltipVisible={false} onChange={onChangeValue} value={value} />
    </div>
  );
}
