import styled from "styled-components";
import {useNavigate , Link} from "react-router-dom";
import { useAuth } from "../authContext.jsx";

const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        // Call logout function
        logout();
        // Navigate to /login
        navigate("/login");
    };

    return (
        <Container>
            <Logo>
                <Link to="/">
                    <img src="./logo.png" alt="logo" />
                </Link>
            </Logo>
            <NavMenu>
                <Link  to="/" >
                    <span>Home</span>
                </Link>
                <Link to="/about">
                    <span>About us</span>
                </Link>
            </NavMenu>
            {isLoggedIn ? (
                <StyledButton onClick={handleLogout}>Logout</StyledButton>
            ) : (
                <StyledButton onClick={() => navigate("/login")}>Login</StyledButton>
            )}

        </Container>
    );
};

//Styled-Components

const Container = styled.div`
  border-bottom: thin solid rgba(109,181,251,255);
  position: fixed;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
  z-index: 1000;
`;

const Logo = styled.a`
  /* padding: 0; */
  width: 30vh;
  /* font-size: 0; */
  /* display: inline-block; */
  align-items: center;

  a {
    cursor: auto;
    img {
      /* display: flex; */
      width: 90%;
      border-radius: 50px;
      /* align-items: center; */
    }
  }
`;


const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  position: relative;
  margin-right: auto;
  margin-left: 30px;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0 12px;

    span {
      color:rgba(109,181,251,255);
      font-size: 18px;
      letter-spacing: 1px;
      line-height: 1.08;
      padding: 1px 0;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgba(109,181,251,255);
        border-radius: 0 0 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0;
        opacity: 0;
        position: absolute;
        right: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 548px) {
    display: none;
  }
`;

const StyledButton  = styled.a`
  color: #ffffff;
  background-color:rgba(109,181,251,255);
  padding: 2vh 3vh;
  margin-right: 45px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: rgba(109,181,251,255);
    border-color: transparent;
    cursor: pointer;
  }
    
  @media (max-width: 600px){
      padding: 1.5vh 2vh;
  }  
`;

export default Header;