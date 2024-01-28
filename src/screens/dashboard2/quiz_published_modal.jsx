import React,{useState, useEffect} from "react";
import Confetti from "react-confetti";
import styles from "../dashboard/dashboard.module.css";
import { ToastContainer, toast } from "react-toastify";

const QuizPublishedNew = ({
  handleCancel,
  newQuizId,
  setShowQuestionModal,
  setActiveScreen
}) => {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const notifyLinkCopied = () => {
    if (newQuizId) {
      const quizLink = `http://localhost:3000/quiz/${newQuizId}`;
      navigator.clipboard
        .writeText(quizLink)
        .then(() => {
          // The copy operation was successful
        })
        .catch((err) => {
          // The copy operation failed
          console.error("Failed to copy quiz link: ", err);
        });
    }
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

    setShowQuestionModal(false)
    setActiveScreen("dashboard")
  }

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
                    ? `http://localhost:3000/quiz/${newQuizId}`
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
            <ToastContainer />
          </div>
  )
}

export default QuizPublishedNew