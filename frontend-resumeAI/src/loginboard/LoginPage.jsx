import Loginboard from "./Loginboard.jsx";
import Header from "../header/Header.jsx";

function LoginPage() {
    return(
        <div style={{display:'flex',justifyContent:'center',alignItems: 'center'}}>
            <div> <Header/> </div>
            <div>
                <Loginboard/>
            </div>
        </div>
    )
}

export default LoginPage;