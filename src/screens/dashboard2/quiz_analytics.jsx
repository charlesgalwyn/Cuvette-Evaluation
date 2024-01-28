import React, { useState, useEffect } from "react";
import styles from "../dashboard/dashboard.module.css";
import { useNavigate } from "react-router-dom";
import ShareIcon from "../../assets/images/share-icon.svg"
import DeleteIcon from "../../assets/images/delete-icon.svg";
import EditIcon from "../../assets/images/edit-icon.svg";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import DeleteModalNew from "./delete_modal";
import { ToastContainer,toast } from "react-toastify";

const QuizAnalyticsNew = ({
  email
}) => {

  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [isAnalyticsLoading, setAnalyticsLoading] = useState(true);
  const [quizIdToDelete, setQuizIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3100/api/quizzes?email=${email}`)
      .then((response) => {
        setQuizzes(response.data);
        setTimeout(() => {
          setAnalyticsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("An error occurred while fetching the quizzes:", error);
      });
  }, [email])

  const handleDeleteIconClick = (quizId) => {
    setQuizIdToDelete(quizId);
    setShowModal(true);
  };

  const handleShareIconClick = (quizId) => {
    console.log("share clicked")
    const quizLink = `http://localhost:3000/quiz/${quizId}`;
    navigator.clipboard
      .writeText(quizLink)
      .then(() => {
        //alert("Quiz link copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying quiz link to clipboard:", error);
      });

    toast.success("Link copied to Clipboard", {
      position: "top-right",
      autoClose: 1400,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleDelete = () => {
    // Delete the quiz
    axios
      .delete(
        `http://localhost:3100/api/${quizIdToDelete}`
      )
      .then((response) => {
        // Remove the deleted quiz from the state
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizIdToDelete));
        // Hide the confirmation modal
        setShowModal(false);
      })
      .catch((error) => console.error("Error deleting quiz:", error));
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  return (
    <div>
      {
        isAnalyticsLoading ? (
          <div className={styles.loaderContainer}>
            <FadeLoader color="#474444" />
          </div>
        ) : (
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

      {
        showModal ? (
          <DeleteModalNew handleDelete={handleDelete} handleCancel={handleCancel} />
        ) : null
      }
      <ToastContainer />

    </div>

  )
}

export default QuizAnalyticsNew