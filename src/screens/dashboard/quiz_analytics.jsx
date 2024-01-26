import React from "react";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";

const QuizAnalytics = ({
  quizzes,
  EditIcon,
  DeleteIcon,
  ShareIcon,
  handleDeleteIconClick,
  handleShareIconClick,
}) => {

  const navigate = useNavigate();
  return (
    <div className={styles.analyticsScreen}>
                <h1 className={styles.analyticsHeading}>Quiz Analytics</h1>
                <table className={styles.analyticsTable}>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Quiz Name</th>
                      <th>Created on</th>
                      <th>Impression</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizzes.map((quiz, index) => (
                      <tr key={quiz._id}>
                        <td>{index + 1}</td>
                        <td>{quiz.quizName}</td>
                        <td>{new Date(quiz.date).toLocaleDateString()}</td>
                        <td>{Math.round(quiz.impressions / 2)}</td>
                        <td>
                          <img
                            src={EditIcon}
                            alt=""
                            onClick={() =>
                              alert(
                                "This Feature is under development, Please try again later..."
                              )
                            }
                          />
                          <img
                            src={DeleteIcon}
                            alt=""
                            onClick={() => handleDeleteIconClick(quiz._id)}
                          />
                          <img
                            src={ShareIcon}
                            alt=""
                            onClick={() => handleShareIconClick(quiz._id)}
                          />
                        </td>
                        <td
                          onClick={() => navigate(`/quizanalysis/${quiz._id}`)}
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          Question Wise Analysis
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
  )
}

export default QuizAnalytics