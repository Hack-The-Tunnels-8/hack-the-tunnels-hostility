import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../components";
import { useAccountContext } from "../../context";
import "./Navbar.style.scss";

function Navbar() {
  const { loggedIn, logout } = useAccountContext();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src="logo.jpeg" alt="logo" width={50}/>
      </div>

      <div className="navbar__search">
        <SearchBar />
      </div>

      <div className="navbar__account">
        {loggedIn() === false ? (
          <>
            <button className="button" onClick={() => navigate("/sign-up")}>Sign Up</button>
            <button className="button" onClick={() => navigate("/login")}>Login</button>
          </>
        ) : (
          <button className="button" onClick={() => logout()}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
