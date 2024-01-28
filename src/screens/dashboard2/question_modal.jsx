import React, { useState } from "react";
import styles from "../dashboard/dashboard.module.css";
import axios from "axios";
import QuizPublishedNew from "./quiz_published_modal";

const QuestionModalNew = ({
  email,
  quizType,
  quizName,
  setQuizName,
  setQuizType,
  handleCancelQuizQuestionModal,
  setShowQuestionModal,
  setActiveScreen

}) => {

  const [questions, setQuestions] = useState([1]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [pollQuestion, setPollQuestion] = useState({});
  const [selectedOptionType, setSelectedOptionType] = useState(0);
  const [ansOption, setAnsOption] = useState({});
  const [options, setOptions] = useState(
    Array(100)
      .fill()
      .map(() => [
        { text: "", imageURL: "" },
        { text: "", imageURL: "" },
        { text: "", imageURL: "" },
        { text: "", imageURL: "" },
      ])
  );
  const [timerType, setTimerType] = useState({});
  const [newQuizId, setNewQuizId] = useState(null);
  const [showQuizPublishedModal, setShowQuizPublishedModal] = useState(false);

  const handleQuestionNoChange = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);

      if (currentQuestionIndex === index) {
        setCurrentQuestionIndex(index > 0 ? index - 1 : 0);
      } else if (currentQuestionIndex > index) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { title: "" }]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleQuestionTextChange = (e, index) => {
    const updatedQuestions = { ...pollQuestion };
    updatedQuestions[index] = e.target.value;
    setPollQuestion(updatedQuestions);
  };

  const handleOptionTypeSelect = (index) => {
    setSelectedOptionType(index);
  };

  const handleRadioSelect = (index) => {
    const updatedAnsOptions = { ...ansOption };
    updatedAnsOptions[currentQuestionIndex] = index;
    setAnsOption(updatedAnsOptions);
  };

  const handleOptionTextChange = (e, questionIndex, optionIndex) => {
    const updatedOptions = [...options];
    updatedOptions[questionIndex][optionIndex] = {
      ...updatedOptions[questionIndex][optionIndex],
      text: e.target.value,
    };
    setOptions(updatedOptions);
  };

  const handleOptionImageURLChange = (e, questionIndex, optionIndex) => {
    const updatedOptions = [...options];
    updatedOptions[questionIndex][optionIndex] = {
      ...updatedOptions[questionIndex][optionIndex],
      imageURL: e.target.value,
    };
    setOptions(updatedOptions);
  };

  const handleTimerTypeSelect = (value) => {
    const updatedTimerTypes = { ...timerType };
    updatedTimerTypes[currentQuestionIndex] = value;
    setTimerType(updatedTimerTypes);
  };

  const handleCreateQuizSubmit = () => {
    // Validate all fields are filled

    const isPollQuestionFilled = pollQuestion[0] !== "";
    const isOptionsFilled = options.some((option) =>
      option.some((item) => item.text !== "" || item.imageURL !== "")
    );
    const isAnsOptionFilled = Object.values(ansOption).some(
      (value) => value !== null
    );
    const isTimerTypeFilled =
      quizType !== "Poll Type"
        ? Object.values(timerType).some((value) => value !== "")
        : true;
    if (!isPollQuestionFilled) {
      alert("Poll question is not filled. Please fill it.");
      return;
    }
    if (selectedOptionType === null) {
      alert("Selected option type is not set. Please set it.");
      return;
    }
    if (!isOptionsFilled) {
      alert("Options are not filled. Please fill it.");
      return;
    }
    if (!isAnsOptionFilled) {
      alert("Answer option is not set. Please set it.");
      return;
    }
    if (!isTimerTypeFilled) {
      alert("Timer type is not set. Please set it.");
      return;
    }

    if (!quizName || !quizType) {
      alert("Please fill in the Quiz Name and Quiz Type");
      return;
    }

    console.log(options);

    const questions = [
      {
        pollQuestion,
        timerType,
        options,
        ansOption,
      },
    ];

    axios
      .post(
        `http://localhost:3100/api/createquiz`,
        { quizName, quizType, questions, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setNewQuizId(response.data.id);
      })
      .catch((error) => {
        console.error("An error occurred while saving the quiz:", error);
      });

    // delete data in states
    setPollQuestion("");
    setOptions(
      Array(5)
        .fill()
        .map(() => [
          { text: "", imageURL: "" },
          { text: "", imageURL: "" },
          { text: "", imageURL: "" },
          { text: "", imageURL: "" },
        ])
    );
    setAnsOption({});
    setTimerType({});
    setQuizName("");
    setQuizType("");
    setQuestions([1]);
    setCurrentQuestionIndex(0);
    setShowQuizPublishedModal(true);
    //setShowQuestionModal(false);
    setNewQuizId(null);
  };

  const handleCancel = () => {
    setShowQuizPublishedModal(false);
  };

  return (
    <div>
      <div
        className={styles.questionModalOverlay}
      >
        <div
          className={styles.questionModal}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalContent}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              className={styles.questionNoContainer}
            >
              <div
                style={{
                  display: "flex",
                  gap: ".5rem",
                  alignItems: "center",
                  overflowX: "auto",
                }}
              >
                {questions.map((question, index) => (
                  <div
                    className={`${styles.questionNo} ${index === currentQuestionIndex
                      ? styles.activeQuestionNumber
                      : ""
                      }`}
                    key={index}
                    onClick={() => handleQuestionNoChange(index)}
                  >
                    {index + 1}
                    {index !== 0 && (
                      <span
                        className={styles.crossBtn}
                        onClick={() => handleDeleteQuestion(index)}
                      >
                        x
                      </span>
                    )}
                  </div>
                ))}
                {/* {questions.length < 5 && ( */}
                <div
                  className={styles.addBtn}
                  onClick={handleAddQuestion}
                >
                  +
                </div>
                {/* // )} */}
              </div>
              {/* <p>Max 5 Questions</p> */}
            </div>
            <div className={styles.questionContent}>
              <div>
                <input
                  type="text"
                  placeholder="Poll Question"
                  value={pollQuestion[currentQuestionIndex] || ""}
                  onChange={(e) =>
                    handleQuestionTextChange(e, currentQuestionIndex)
                  }
                  className={styles.pollQuestion}
                />
              </div>

              <div
                className={styles.pollOptionType}
                style={{ display: "flex" }}
              >
                <div style={{ marginRight: "1.5rem" }}>Option Type:</div>
                <label className={styles.modalLabel}>
                  <input
                    type="radio"
                    name="optionType"
                    checked={selectedOptionType === 0}
                    onChange={() => handleOptionTypeSelect(0)}
                  />
                  Text
                </label>
                <label
                  className={styles.modalLabel}
                  style={{ marginLeft: ".5rem" }}
                >
                  <input
                    type="radio"
                    name="optionType"
                    checked={selectedOptionType === 1}
                    onChange={() => handleOptionTypeSelect(1)}
                  />
                  Image URL
                </label>
                <label
                  className={styles.modalLabel}
                  style={{ marginLeft: ".5rem" }}
                >
                  <input
                    type="radio"
                    name="optionType"
                    checked={selectedOptionType === 2}
                    onChange={() => handleOptionTypeSelect(2)}
                  />
                  Text and Image URL
                </label>
              </div>
              <div
                className={styles.pollOptions}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {[0, 1, 2, 3].map((index) => (
                  <div className={styles.modalLabel} key={index}>
                    <input
                      type="radio"
                      name="ansOption"
                      checked={ansOption[currentQuestionIndex] === index}
                      onChange={() => handleRadioSelect(index)}
                    />
                    {selectedOptionType === 0 && (
                      <input
                        type="text"
                        name={`optionText_${index}`}
                        value={options[currentQuestionIndex][index].text}
                        placeholder="Option"
                        onChange={(e) =>
                          handleOptionTextChange(
                            e,
                            currentQuestionIndex,
                            index
                          )
                        }
                        className={`${styles.optionInput} ${ansOption &&
                          ansOption[currentQuestionIndex] === index
                          ? styles.greenBackground
                          : ""
                          }`}
                      />
                    )}
                    {selectedOptionType === 1 && (
                      <input
                        type="url"
                        name={`optionImageURL_${index}`}
                        value={
                          options[currentQuestionIndex][index].imageURL
                        }
                        placeholder="Option Image URL"
                        onChange={(e) =>
                          handleOptionImageURLChange(
                            e,
                            currentQuestionIndex,
                            index
                          )
                        }
                        className={`${styles.optionInput} ${ansOption &&
                          ansOption[currentQuestionIndex] === index
                          ? styles.greenBackground
                          : ""
                          }`}
                      />
                    )}
                    {selectedOptionType === 2 && (
                      <>
                        <input
                          type="text"
                          name={`optionText_${index}`}
                          value={options[currentQuestionIndex][index].text}
                          placeholder="Option"
                          onChange={(e) =>
                            handleOptionTextChange(
                              e,
                              currentQuestionIndex,
                              index
                            )
                          }
                          className={`${styles.optionInput} ${ansOption &&
                            ansOption[currentQuestionIndex] === index
                            ? styles.greenBackground
                            : ""
                            }`}
                        />

                        <input
                          type="url"
                          name={`optionImageURL_${index}`}
                          value={
                            options[currentQuestionIndex][index].imageURL
                          }
                          placeholder="Option Image URL"
                          onChange={(e) =>
                            handleOptionImageURLChange(
                              e,
                              currentQuestionIndex,
                              index
                            )
                          }
                          className={`${styles.optionInput} ${ansOption &&
                            ansOption[currentQuestionIndex] === index
                            ? styles.greenBackground
                            : ""
                            }`}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>

              {quizType !== "Poll Type" && (
                <div
                  className={styles.timerType}
                  style={{ display: "flex" }}
                >
                  <div style={{ marginRight: "auto" }}>Timer Type:</div>
                  <label className={styles.modalLabel}>
                    <input
                      type="radio"
                      name="timerType"
                      value="5 Sec"
                      checked={timerType[currentQuestionIndex] === "5 Sec"}
                      onChange={() => handleTimerTypeSelect("5 Sec")}
                    />{" "}
                    5 Sec
                  </label>
                  <label
                    className={styles.modalLabel}
                    style={{ marginLeft: ".5rem" }}
                  >
                    <input
                      type="radio"
                      name="timerType"
                      value="10 Sec"
                      checked={timerType[currentQuestionIndex] === "10 Sec"}
                      onChange={() => handleTimerTypeSelect("10 Sec")}
                    />
                    10 Sec
                  </label>
                  <label
                    className={styles.modalLabel}
                    style={{ marginLeft: ".5rem" }}
                  >
                    <input
                      type="radio"
                      name="timerType"
                      value="OFF"
                      checked={timerType[currentQuestionIndex] === "OFF"}
                      onChange={() => handleTimerTypeSelect("OFF")}
                    />{" "}
                    OFF
                  </label>
                </div>
              )}
              <div className={styles.buttonContainer}>
                <button
                  onClick={handleCancelQuizQuestionModal}
                  className={styles.cancelModalButton}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateQuizSubmit}
                  className={styles.confirmCreateQuizButton}
                >
                  Create Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        showQuizPublishedModal ? (
          <QuizPublishedNew
            newQuizId={newQuizId}
            handleCancel={handleCancel}
            setShowQuestionModal={setShowQuestionModal}
            setActiveScreen={setActiveScreen}
          />
        ) : null
      }
    </div>

  )
}

export default QuestionModalNew