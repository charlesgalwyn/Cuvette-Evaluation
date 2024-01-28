import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../dashboard/dashboard.module.css"
import SideBar from "../dashboard/sidebar";
import OverviewNew from "./overview";
import TrendingQuizNew from "./trending_quiz";
import QuizAnalyticsNew from "./quiz_analytics";
import CreateQuizNew from "./create_quiz_modal";

const Dashboard2 = () => {
  const jwtToken = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3100/api/isloggedin`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        if (response.data.isLoggedIn) {
          setEmail(response.data.user.email);
          setIsLoggedIn(response.data.isLoggedIn);
        } else {
          console.log("User is not logged in");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, [jwtToken])

  const handleLogout = () => {
    axios
      .post(`http://localhost:3100/api/logout`, null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("jwt"); // Remove JWT from local storage
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <SideBar
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
          handleLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />

        <div className={styles.subContainer}>
          {
            activeScreen === 'dashboard' ? (
              <div className={styles.dashboardScreen}>
                <OverviewNew email={email} />
                <div>
                  <h2>Trending Quiz</h2>
                  <TrendingQuizNew email={email} />
                </div>
              </div>
            ) : null
          }

          {
            activeScreen === 'analytics' ? (
              <QuizAnalyticsNew email={email} />
            ) : null
          }

          {
            activeScreen === 'createQuiz' ? (
             <CreateQuizNew setActiveScreen={setActiveScreen} email={email}/>
            ) : null
          }
        </div>
      </div>
    </>
  )
}

export default Dashboard2