import React,{useState, useEffect} from "react";
import styles from "../dashboard/dashboard.module.css";
import TrendingCard from "../../components/trendingCard/TrendingCard";
import axios from "axios";

const TrendingQuizNew = ({
  email
}) => {

  const [trendingQuizzes, setTrendingQuizzes] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:3100/api/trendingQuizzes?email=${email}`
      )
      .then((response) => {
        setTrendingQuizzes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trending quizzes:", error);
      });
  },[email])
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

export default TrendingQuizNew