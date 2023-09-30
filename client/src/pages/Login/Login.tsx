import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components";
import { useAccountContext } from "../../context";
import "./Login.style.scss";

function Login() {
  const [message, setMessage] = useState(null);
  const { loggedIn, login } = useAccountContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const attemptLogin = async (email?: string, password?: string) => {
    let message = "";

    try {
      if (email !== undefined && password !== undefined) {
        message = await login(email, password);
      } else {
        message = await login("admin@email.com", "password");
      }
      setMessage(message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedIn() === true) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <Page>
      <div className="login-page">
        <h1>Login</h1>
        <div className="login--container">
          <input
            type="text"
            placeholder="Email Address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button onClick={() => attemptLogin(email, password)}>
            Login (using input credentials)
          </button>
          <button onClick={() => attemptLogin()}>
            Login (as user set in code)
          </button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </Page>
  );
}

export default Login;
