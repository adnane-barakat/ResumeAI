import './App.css'
import {  Route,Routes } from "react-router-dom";
import HomePage from "./Home/HomePage.jsx";
import LoginPage from "./loginboard/LoginPage.jsx";
import DashPage from "./dashboard/DashPage.jsx";
import {AuthProvider} from "./AuthProvider.jsx";

function App() {


  return (


          <div>
              <Routes>
                  <Route exact path="/" element={<HomePage />}/>
                  <Route path="/login" element={<LoginPage />}/>
                  <Route path="/dashboard" element={<DashPage />}/>
              </Routes>
          </div>
  )
}

export default App
