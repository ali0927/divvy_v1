import { BetType } from '../../constants'

type PendingHeaderProps = {
    selectionTeam?: string,
    otherTeam?: string,
    betType?: BetType
}

export const PendingHeader = ({ selectionTeam, otherTeam, betType, ...props }: PendingHeaderProps) => {
    const fadedTeam = betType !== BetType.total && otherTeam
    
    return(
        <div style={style.wrapper} {...props}>
            <h3 style={fadedTeam === selectionTeam ? style.fadedTeam : style.team}>{selectionTeam}</h3>
            <h3 style={fadedTeam === otherTeam ? style.fadedTeam : style.team}>{otherTeam}</h3>
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
        marginBottom: '1rem'
    }
}