import React from "react";
import styles from "./dashboard.module.css";

const QuestionModal = ({
  questions,
  currentQuestionIndex,
  handleQuestionNoChange,
  handleDeleteQuestion,
  handleAddQuestion,
  pollQuestion,
  handleQuestionTextChange,
  selectedOptionType,
  handleOptionTypeSelect,
  ansOption,
  handleRadioSelect,
  options,
  handleOptionTextChange,
  handleOptionImageURLChange,
  quizType,
  timerType,
  handleTimerTypeSelect,
  handleCancelQuizQuestionModal,
  handleCreateQuizSubmit

}) => {
  return (
    <div
            className={styles.questionModalOverlay}
          // onClick={handleCreateQuiz}
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
  )
}

export default QuestionModal