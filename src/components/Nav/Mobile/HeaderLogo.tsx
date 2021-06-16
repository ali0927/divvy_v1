import Logo from "../../../img/divvy-logo.png"
export const HeaderLogo = () => {
    return (
        <div style={{ marginTop: 6 }}>
            <a href="/app">
                <img style={{ width: 24, height: 24, marginTop: 8 }} src={Logo} />
            </a>
        </div>
    );
};
