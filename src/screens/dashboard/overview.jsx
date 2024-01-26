import React from "react";
import styles from "./Dashboard.module.css";

const Overview = ({
  quizData
}) => {
  return (
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

export default Overview