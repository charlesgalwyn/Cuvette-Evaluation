import React from "react";
import styles from "./Dashboard.module.css";
import TrendingCard from "../../components/trendingCard/TrendingCard";

const TrendingQuiz = ({
  trendingQuizzes
}) => {
  return (
    <div>
      <div
        className={`${styles.trendingQuizCardContainer} ${trendingQuizzes.length > 0 ? "" : styles.firstQuiz
          }`}
      >
        {trendingQuizzes.length > 0 ? (
          trendingQuizzes.map((quiz) => (
            <TrendingCard
              key={quiz._id}
              quizName={quiz.quizName}
              impressions={Math.round(quiz.impressions / 2)}
              creationDate={new Date(quiz.date).toLocaleDateString(
                "en-US",
                { day: "2-digit", month: "short", year: "numeric" }
              )}
            />
          ))
        ) : (
          <p className={styles.firstQuizPara}>
            You haven't created any Quiz, Click on Create Quiz to
            create your first Quiz
          </p>
        )}
      </div>
    </div>
  )
}

export default TrendingQuiz