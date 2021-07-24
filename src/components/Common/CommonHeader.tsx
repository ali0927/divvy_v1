export const CommonHeader = (props: { heading: string, side: boolean }) => {
    return (
        <div className="heading-align-container" style={props.side ? {height: "auto"} : {}}>
            <div className={props.side ? "header-align header-side" : "header-align"}>
                <h2>{props.heading}</h2>
            </div>
        </div>
    )
}