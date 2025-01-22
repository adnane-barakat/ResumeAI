import './home.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext.jsx";

function Home() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth()

    const handleStarting = () => {
        if(!isLoggedIn) {
            navigate("/login");
        } else {
            navigate("/dashboard");
        }
    }

    return (
        <div className="home-container">
            <div className="content-container">
                <div className="content">
                    <h1 className="title">
                        AI-Powered Resume Editer
                    </h1>
                    <p className="description">
                        Our AI-powered platform helps you create optimized resumes that stand out to employers.
                        If you are looking to improve your current resume, our smart
                        suggestions and job-matching features make the process easier than ever.
                    </p>
                    <button className="cta-button" onClick={handleStarting}>
                        Start Now
                    </button>
                </div>
            </div>

            <div className="image-container">
                <img src="/home.jpg" alt="home"/>
            </div>
        </div>

    )
}

export default Home;