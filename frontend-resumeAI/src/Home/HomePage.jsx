import Header from "../header/Header.jsx";
import Home from "./Home.jsx";
function HomePage() {

    return (
        <div className="HomePage" style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{flex:'1'}}><Header/></div>
            <br/>
            <div >
                <Home/>
            </div>
        </div>

    )
}

export default HomePage;