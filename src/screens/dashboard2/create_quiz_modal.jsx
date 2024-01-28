import React, { useState } from "react";
import styles from "../dashboard/dashboard.module.css";
import QuestionModalNew from "./question_modal";

const CreateQuizNew = ({
  email,
  setActiveScreen,
}) => {

  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState("");
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const handleCancelQuizModal = () => {
    setActiveScreen("dashboard");
  };

  const handleCancelQuizQuestionModal = () => {
    setShowQuestionModal(false);
    setActiveScreen("dashboard")
  };

  const handleShowQuizQueModal = () => {
    if (quizName && quizType) {
      //setActiveScreen("dashboard");
      setShowQuestionModal(true);
    } else {
      alert("Please fill in the Quiz Name and Quiz Type");
    }
  };

  return (
    <div>
      <div className={styles.createQuizScreen}>
        <div className={styles.modalOverlay}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalQuizNameContent}>
              <div>
                <input
                  type="text"
                  placeholder="Quiz name"
                  value={quizName}
                  onChange={(e) => setQuizName(e.target.value)}
                  className={styles.modalQuizNameInput}
                />
              </div>
              <div className={styles.modalQuizTypeContainer}>
                <div>Quiz Type</div>
                <label className={styles.modalLabel}>
                  <input
                    type="radio"
                    value="Q & A"
                    checked={quizType === "Q & A"}
                    onChange={() => setQuizType("Q & A")}
                    className={styles.modalRadio}
                  />
                  Q & A
                </label>
                <label className={styles.modalLabel}>
                  <input
                    type="radio"
                    value="Poll Type"
                    checked={quizType === "Poll Type"}
                    onChange={() => setQuizType("Poll Type")}
                    className={styles.modalRadio}
                  />
                  Poll Type
                </label>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  onClick={handleCancelQuizModal}
                  className={styles.cancelModalButton}
                >
                  Cancel
                </button>
                <button
                  onClick={handleShowQuizQueModal}
                  className={styles.confirmQuizNameButton}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        showQuestionModal ? (
         <QuestionModalNew 
         email={email}
         handleCancelQuizQuestionModal={handleCancelQuizQuestionModal}
         quizType={quizType}
         quizName={quizName}
         setQuizName={setQuizName}
         setQuizType={setQuizType}
         setShowQuestionModal={setShowQuestionModal}
         setActiveScreen={setActiveScreen}
         />
        ) : null
      }
    </div>

  )
}

export default CreateQuizNew