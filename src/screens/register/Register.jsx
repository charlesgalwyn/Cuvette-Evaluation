import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: ""
  });

  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [activeMode, setActiveMode] = useState("signup");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitSignUpForm = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setSignupErrorMessage("Passwords do not match");
      setFormData({
        ...formData,
        password: "",
        confirmPassword: "",
      });
      return;
    }


    if (formData.code !== "010203") {
      alert("Please enter the correct Admin code");
      setFormData({
        ...formData,
        code: "",
      });
      // setIsSignUpLoading(false);
      return;
    }

    setIsSignUpLoading(true);

    fetch(`http://localhost:3100/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "FAIL" || data.message === "An error occurred") {
          setSignupErrorMessage(data.message);
          setIsSignUpLoading(false);
        } else {
          localStorage.setItem("jwt", data.token);
          console.log(data)
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmitLoginForm = (e) => {
    e.preventDefault();

    // console.log("fucntion started");

    if (formData.code !== "010203") {
      console.log(formData.code)
      alert("Please enter the correct Admin code");
      setFormData({
        ...formData,
        code: "",
      });
      // setIsSignUpLoading(false);
      return;
    }
    setIsLoginLoading(true);

    fetch(`http://localhost:3100/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "FAIL") {
          setLoginErrorMessage(data.message);
          console.log(data.message);
          setIsLoginLoading(false);
          setFormData({
            ...formData,
            password: "",
          });
        } else {
          localStorage.setItem("jwt", data.token);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("fucntion stopped");

  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <FadeLoader color="#474444" />
      </div>
    );
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <div className={styles.logo}>QUIZZIE</div>
          <div className={styles.modeSwitch}>
            <button
              className={`${styles.signUpMode} ${activeMode === "signup" ? styles.activeMode : ""
                }`}
              onClick={() => setActiveMode("signup")}
            >
              Sign Up
            </button>
            <button
              className={`${styles.logInMode} ${activeMode === "login" ? styles.activeMode : ""
                }`}
              onClick={() => setActiveMode("login")}
            >
              Log In
            </button>
          </div>

          {activeMode === "signup" && (
            <div className={styles.signUpFormContainer}>
              <form
                action={`http://localhost:3100/api/signup`}
                method="POST"
                onSubmit={handleSubmitSignUpForm}
                className={styles.formContainer}
              >
                <div className={styles.formAttribute}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formAttribute}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formAttribute}>
                  {" "}
                  <label htmlFor="password" className={styles.formLabel}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formAttribute}>
                  <label htmlFor="confirmPassword" className={styles.formLabel}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formAttribute}>
                  <label htmlFor="code" className={styles.formLabel}>
                    Admin Code
                  </label>
                  <input
                    type="password"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                {signupErrorMessage && (
                  <div className={styles.errorMessageLabel}>
                    {signupErrorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className={styles.signUpBtn}
                  onClick={handleSubmitSignUpForm}
                >
                  {isSignUpLoading ? "Loading..." : "Sign Up"}
                </button>
              </form>
            </div>
          )}

          {activeMode === "login" && (
            <div className={styles.logInFormContainer}>
              <form
                action={`http://localhost:3100/api/login`}
                method="POST"
                onSubmit={handleSubmitLoginForm}
                className={styles.formContainer}
              >
                <div className={styles.formAttribute}>
                  {" "}
                  <label htmlFor="email" className={styles.formLabel}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formAttribute}>
                  <label htmlFor="password" className={styles.formLabel}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formAttribute}>
                  <label htmlFor="code" className={styles.formLabel}>
                    Admin Code
                  </label>
                  <input
                    type="password"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>

                {loginErrorMessage && (
                  <div className={styles.errorMessageLabel}>
                    {loginErrorMessage}
                  </div>
                )}

                <button type="submit" className={styles.signUpBtn}>
                  {isLoginLoading ? "Loading..." : "Log In"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
