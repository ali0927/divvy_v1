import { BetType } from '../../constants'
import Countdown from 'react-countdown'
import { isPast } from 'date-fns'
import { useEffect, useState } from 'react'

type PendingHeaderProps = {
    selectionTeam?: string,
    otherTeam?: string,
    betType?: BetType,
    commenceTime?: number
    endTime: number
}

const Completed = (props: {endTime: number}) => {
    const [ended, setEnded] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setEnded(isPast(props?.endTime))
        }, 1000);

        ended && clearInterval(timer)
        return () => clearInterval(timer);
    })

    return(
        <div>{ ended ? 'Ended' : 'LIVE' }</div>
    )
}

export const PendingHeader = ({ selectionTeam, otherTeam, betType, commenceTime, endTime, ...props }: PendingHeaderProps) => {
    const fadedTeam = betType !== BetType.total && otherTeam
    
    return(
        <div style={style.wrapper} {...props}>
            <div>
                <h3 style={fadedTeam === selectionTeam ? style.fadedTeam : style.team}>{selectionTeam}</h3>
                <h3 style={fadedTeam === otherTeam ? style.fadedTeam : style.team}>{otherTeam}</h3>
            </div>

            <Countdown date={commenceTime}><Completed endTime={endTime}/></Countdown>
        </div>
    )
}

const teamCommonCSS = {
    padding: '3px 0',
    margin: '0',
    lineHeight: '.7'
}

const style = {
    team: {
        ...teamCommonCSS
    },
    fadedTeam: {
        ...teamCommonCSS,
        opacity: '.3'
    },
    wrapper: {
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between'
    }
}