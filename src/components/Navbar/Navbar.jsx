import "./Navbar.css";
import Logo from "../../assets/Ironhub-logo.png";
import ArrowDown from "../../assets/arrow-down.png";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context.jsx";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, user, logOut } = useContext(AuthContext);
  const [isDropped, setIsDropped] = useState(false);

  const showMenu = () => {
    setIsDropped(!isDropped);
  };
  
  return (
    <div className="navbar-container">
      {isLoggedIn ? (
        <>
          <nav className="navbar-logged-in">
            <div className="logo">
              <NavLink
                to={"/posts/"}
                onClick={() => {
                  setIsDropped(false);
                }}
              >
                <img src={Logo} alt="ironhub-logo" id="ironhub-logo" />
              </NavLink>
            </div>
            <div className="dropdown">
              <button className="user-nav" onClick={showMenu}>
                <img
                  className="user-picture"
                  src={user.picture}
                  alt="picture-user"
                />
                <p className="user-profile-name">{user.name.split(" ")[0]} </p>
                <img
                  className="open-icon"
                  width={20}
                  src={ArrowDown}
                  alt="arrow-down"
                />
              </button>
              {isDropped && (
                <ul className="links logged-in">
                  <NavLink to={`/${user._id}`} onClick={showMenu}>
                    <li>My Profile</li>
                  </NavLink>
                  <button onClick={logOut}>
                    <li>Log Out</li>
                  </button>
                </ul>
              )}
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="navbar">
            <div className="logo">
              <NavLink to={"/"}>
                <img width={120} src={Logo} alt="ironhub-logo" />
              </NavLink>
            </div>
            <ul className="links logged-out">
              <NavLink to={"/auth/signup"}>
                <li id="nav-signup">Signup</li>
              </NavLink>
              <NavLink to={"/auth/login"}>
                <li id="nav-login">Login</li>
              </NavLink>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default Navbar;
