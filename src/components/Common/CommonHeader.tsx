export const CommonHeader = (props: { heading: string }) => {
    return (
        <div className="heading-align-container">
            <div className="header-align">
                <h2>{props.heading}</h2>
            </div>
        </div>
    )
}