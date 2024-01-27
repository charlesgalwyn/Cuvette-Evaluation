import React from "react";
import styles from "./dashboard.module.css";

const CreateQuiz = ({
  quizName,
  setQuizName,
  quizType,
  setQuizType,
  handleCancelQuizModal,
  handleShowQuizQueModal
}) => {
  return (
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
  )
}

export default CreateQuiz