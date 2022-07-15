import DumbMerchLogo from "../../assets/images/Frame.png"

function LoginImg() {
    return (
        <>
        <div style={Styles.LoginImageContainer}>
            <img src={DumbMerchLogo} alt="Empty"/>
        </div>
        <h1 style={Styles.ContentTitle}>Easy, Fast and Reliable</h1>
        <p style={Styles.ContentText}>Go shopping for merchandise, just go to dumb merch shopping. the biggest merchandise in Indonesia</p>
        </>
    )
}

const Styles = {
    LoginImageContainer: {
        textAlign: "left",
        padding : "40px 0px"
    },
    ContentText: {
        color: "grey"
    },
    ContentTitle: {
        color : "white"
    }
}

export default LoginImg