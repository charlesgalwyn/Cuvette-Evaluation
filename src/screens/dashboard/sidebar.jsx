import React from "react";
import styles from "./dashboard.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SideBar = ({
  activeScreen,
  setActiveScreen,
  isLoggedIn,
  handleLogout
}) => {

  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.sideBar}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <div className={styles.logo}>QUIZZIE</div>
          </Link>
          <div className={styles.modesContainer}>
            <button
              className={`${styles.modeBtn} ${activeScreen === "dashboard" ? styles.activeScreen : ""
                }`}
              onClick={() => setActiveScreen("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`${styles.modeBtn} ${activeScreen === "analytics" ? styles.activeScreen : ""
                }`}
              onClick={() => setActiveScreen("analytics")}
            >
              Analytics
            </button>
            <button
              className={`${styles.modeBtn} ${activeScreen === "createQuiz" ? styles.activeScreen : ""
                }`}
              onClick={() => setActiveScreen("createQuiz")}
            >
              Create Quiz
            </button>
          </div>
          <hr />
          <button
            className={styles.logoutBtn}
            onClick={isLoggedIn ? handleLogout : () => navigate("/")}
          >
            {isLoggedIn ? "LOGOUT" : "LOG IN"}
          </button>
        </div>
    </div>
  )
}

export default SideBar
