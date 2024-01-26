import React from "react";
import Confetti from "react-confetti";
import styles from "./Dashboard.module.css";

const QuizPublished = ({
  width,
  height,
  handleCancel,
  newQuizId,
  notifyLinkCopied
}) => {
  return (
    <div className={styles.modalOverlay} onClick={handleCancel}>
            <Confetti width={width} height={height} />
            <div
              className={styles.modalPublished}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalContent}>
                <p
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Congrats your Quiz is <br />
                  Published!
                </p>
                <div className={styles.quizLink}>
                  {newQuizId
                    ? `http://localhost:3100/quiz/${newQuizId}`
                    : "Link loading... "}
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.shareLinkBtn}
                    onClick={notifyLinkCopied}
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}

export default QuizPublished