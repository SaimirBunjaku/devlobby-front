import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminForm.scss";
import cloudsBackground from "../../../assets/images/cloudsBackground.PNG";
import cloudsBackgroundVertical from "../../../assets/images/cloudsBackgroundVertical.PNG";
import devlobbyLogoWhiteHorisontal from "../../../assets/images/devlobbyWhiteHorisontal.png";
import { AuthService } from "../../../services/AuthService";
import { AuthContext } from "../../../utils/AuthContext"; 

const AdminForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const { adminLogin } = React.useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    try {
      const response = await AuthService.adminLogin({ email, password });
      if (response.token && response.isAdmin) {
        adminLogin(response.token, true); 
        navigate("/admin"); 
      } else {
        setErrorMessage("Invalid admin credentials or not authorized.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="admin-login-page"
      style={{
        backgroundImage: `url(${
          isMobile ? cloudsBackgroundVertical : cloudsBackground
        })`,
      }}
    >
      <div className="welcome-and-form">
        <div className="form-content">
          <div className="welcome-section">
            <h1>The administration panel of</h1>
            <div className="logoOfAdmin">
              <img src={devlobbyLogoWhiteHorisontal} alt="DevLobby Logo" />
            </div>
            <center>
              <p className="paragraph-of-welcome">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </center>
          </div>
          <div className="form-section">
            <form onSubmit={handleLoginSubmit}>
              <h2 style={{ color: "#1a1a1a" }}>Good to see you back, admin!</h2>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="remember-me">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <div className="buttons">
                <button type="submit" className="login-btn-admin">
                  Log in
                </button>
                <button
                  type="button"
                  className="signin-btn"
                  onClick={() => navigate("/login")}
                >
                  Sign In as a client
                </button>
              </div>
              {errorMessage && (
                <div className="error-message" style={{ color: "red" }}>
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
