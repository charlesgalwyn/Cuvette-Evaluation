import React, { useState, useEffect } from "react";
import styles from "../dashboard/dashboard.module.css";
import axios from "axios";
import { FadeLoader } from "react-spinners";

const OverviewNew = ({
  email
}) => {

  const [quizData, setQuizData] = useState(null);
  const [overviewLoading, setOverviewLoading] = useState(true)
  useEffect(() => {
    axios
      .get(`http://localhost:3100/api/userData?email=${email}`)
      .then((response) => {
        const { quizzes, questions, impressions } = response.data;
        setQuizData({ quizzes, questions, impressions });
        setOverviewLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [email])
  return (
    <div>
      {
        overviewLoading ? (
          <div className={styles.loaderContainer}>
            <FadeLoader color="#474444" />
          </div>
        ) : (
          <div className={styles.dashboardMainCard}>
            <div className={styles.totalQuiz}>
              <div className={styles.dashboardQuizDataNumbers}>
                {quizData && quizData.quizzes}
              </div>
              Quizzes Created
            </div>
            <div className={styles.totalQuestions}>
              <div className={styles.dashboardQuizDataNumbers}>
                {quizData && quizData.questions}
              </div>
              Questions Created
            </div>
            <div className={styles.totalImpressions}>
              <div className={styles.dashboardQuizDataNumbers}>
                {quizData && quizData.impressions >= 2000
                  ? `${Math.round(quizData.impressions / 2 / 1000).toFixed(1)}k`
                  : Math.round(quizData.impressions / 2)}
              </div>{" "}
              Impressions
            </div>
          </div>
        )
      }
    </div>
  )
}

export default OverviewNew