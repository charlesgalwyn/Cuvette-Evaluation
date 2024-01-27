import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import DeleteIcon from "../../assets/images/delete-icon.svg";
import EditIcon from "../../assets/images/edit-icon.svg";
import ShareIcon from "../../assets/images/share-icon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from "react-spinners";
import SideBar from "./sidebar";
import DeleteModal from "./delete_modal";
import CreateQuiz from "./create_quiz_modal";
import QuestionModal from "./question_modal";
import QuizPublished from "./quiz_published_modal";
import TrendingQuiz from "./trending_quiz";
import QuizAnalytics from "./quiz_analytics";
import Overview from "./overview";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState("");
  const [questions, setQuestions] = useState([1]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [pollQuestion, setPollQuestion] = useState({});
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
  const [selectedOptionType, setSelectedOptionType] = useState(0);
  const [ansOption, setAnsOption] = useState({});
  const [timerType, setTimerType] = useState({});
  const [newQuizId, setNewQuizId] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [isAnalyticsLoading, setAnalyticsLoading] = useState(true);
  const [showQuizPublishedModal, setShowQuizPublishedModal] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [trendingQuizzes, setTrendingQuizzes] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  const handleDeleteIconClick = (quizId) => {
    setQuizIdToDelete(quizId);
    setShowModal(true);
  };

  const [quizIdToDelete, setQuizIdToDelete] = useState(null);

  const handleDelete = () => {
    // Delete the quiz
    axios
      .delete(
        `http://localhost:3100/api/quiz/${quizIdToDelete}`
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
    setShowQuizPublishedModal(false);
  };

  //for createQuiz Screen
  const handleCancelQuizModal = () => {
    setActiveScreen("dashboard");
  };

  const handleShowQuizQueModal = () => {
    if (quizName && quizType) {
      setShowQuestionModal(true);
      setActiveScreen("dashboard");
    } else {
      alert("Please fill in the Quiz Name and Quiz Type");
    }
  };

  const handleCancelQuizQuestionModal = () => {
    setShowQuestionModal(false);
  };

  //Question Modal -
  //for question numbers
  const handleAddQuestion = () => {
    // if (questions.length < 5) {
    setQuestions([...questions, { title: "" }]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    // }
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
    // setCurrentQuestionIndex(index-1)
  };

  useEffect(() => {
    // Perform side effects here when currentQuestionIndex changes
  }, [currentQuestionIndex]);

  // Update question number change handler to set current question index
  const handleQuestionNoChange = (index) => {
    setCurrentQuestionIndex(index);
  };

  //for questions and options
  const handleOptionTypeSelect = (index) => {
    setSelectedOptionType(index);
  };

  
  const handleQuestionTextChange = (e, index) => {
    const updatedQuestions = { ...pollQuestion };
    updatedQuestions[index] = e.target.value;
    setPollQuestion(updatedQuestions);
  };

  const handleRadioSelect = (index) => {
    const updatedAnsOptions = { ...ansOption };
    updatedAnsOptions[currentQuestionIndex] = index;
    setAnsOption(updatedAnsOptions);
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
    setShowQuestionModal(false);
    setNewQuizId(null);
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

  //for analytics tab
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
  }, [activeScreen, email]);

  //for quiz published modal

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

  const jwtToken = localStorage.getItem("jwt");

  axios
    .get(`http://localhost:3100/api/isloggedin`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then((response) => {
      if (response.data.isLoggedIn) {
        setEmail(response.data.user.email);
        setIsLoggedIn(response.data.isLoggedIn);
      } else {
        console.log("User is not logged in");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });

  const handleLogout = () => {
    axios
      .post(`http://localhost:3100/api/logout`, null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("jwt"); // Remove JWT from local storage
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const handleShareIconClick = (quizId) => {
    const quizLink = `http://localhost:3100/quiz/${quizId}`;
    navigator.clipboard
      .writeText(quizLink)
      .then(() => {
        // alert("Quiz link copied to clipboard");
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
  };

  useEffect(() => {
    // Fetch data for dashboard main container
    axios
      .get(`http://localhost:3100/api/userData?email=${email}`)
      .then((response) => {
        const { quizzes, questions, impressions } = response.data;
        setQuizData({ quizzes, questions, impressions });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Fetch trending quizzes
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
  }, [email]);

  useEffect(() => {
    if (quizData !== null && trendingQuizzes) {
      setTimeout(() => {
        setDashboardLoading(false);
      }, 600);
    }
  }, [quizData, trendingQuizzes]);

  console.log(trendingQuizzes)

  return (
    <>
      <div className={styles.mainContainer}>
        <SideBar 
        activeScreen = {activeScreen}
        setActiveScreen = {setActiveScreen}
        isLoggedIn = {isLoggedIn}
        handleLogout = {handleLogout}
        />

        <div className={styles.subContainer}>
          {activeScreen === "dashboard" &&
            (dashboardLoading ? (
              <div className={styles.loaderContainer}>
                <FadeLoader color="#474444" />
              </div>
            ) : (
              <div className={styles.dashboardScreen}>
                <Overview 
                quizData = {quizData}
                />
                <div>
                  <h2>Trending Quiz</h2>
                  <TrendingQuiz 
                  trendingQuizzes = {trendingQuizzes}
                  />
                </div>
              </div>
            ))}

          {activeScreen === "analytics" &&
            (isAnalyticsLoading ? (
              <div className={styles.loaderContainer}>
                <FadeLoader color="#474444" />
              </div>
            ) : (
              <QuizAnalytics 
              quizzes = {quizzes}
              EditIcon = {EditIcon}
              DeleteIcon = {DeleteIcon}
              ShareIcon = {ShareIcon}
              handleDeleteIconClick = {handleDeleteIconClick}
              handleShareIconClick = {handleShareIconClick}
              />
            ))}
        </div>
        {showModal && (
          <DeleteModal 
          handleCancel = {handleCancel}
          handleDelete = {handleDelete}
          />
        )}
        {activeScreen === "createQuiz" && (
          <CreateQuiz 
          quizName = {quizName}
          setQuizName = {setQuizName}
          quizType = {quizType}
          setQuizType = {setQuizType}
          handleCancelQuizModal = {handleCancelQuizModal}
          handleShowQuizQueModal = {handleShowQuizQueModal}
          />
        )}

        {showQuestionModal && (
          <QuestionModal 
          questions = {questions}
          currentQuestionIndex = {currentQuestionIndex}
          handleQuestionNoChange = {handleQuestionNoChange}
          handleDeleteQuestion = {handleDeleteQuestion}
          handleAddQuestion = {handleAddQuestion}
          pollQuestion = {pollQuestion}
          handleQuestionTextChange = {handleQuestionTextChange}
          selectedOptionType = {selectedOptionType}
          handleOptionTypeSelect = {handleOptionTypeSelect}
          ansOption = {ansOption}
          handleRadioSelect = {handleRadioSelect}
          options = {options}
          handleOptionTextChange = {handleOptionTextChange}
          handleOptionImageURLChange = {handleOptionImageURLChange}
          quizType = {quizType}
          timerType = {timerType}
          handleTimerTypeSelect = {handleTimerTypeSelect}
          handleCancelQuizQuestionModal = {handleCancelQuizQuestionModal}
          handleCreateQuizSubmit = {handleCreateQuizSubmit}
          />
        )}
        {showQuizPublishedModal && (
          <QuizPublished 
          width = {width}
          height = {height}
          handleCancel = {handleCancel}
          newQuizId = {newQuizId}
          notifyLinkCopied = {notifyLinkCopied}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
