import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import { useParams } from 'react-router-dom';
import Loader from '../utils/globalLoader/loader';
import ShowQuizeQuestion from '../components/take_quiz/show_quiz_question';
import FinishQuize from '../components/take_quiz/finish_quiz';

const TakeQuize = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestion] = useState([]);
  const [no, setNo] = useState(0)
  const [correctOptions, setCurrectOptions] = useState([]);
  const [timer, setTimer] = useState(null);
  const [currentPopup, setCurrentPopup] = useState('takeQuize');
  const [isOpen, setIsOpen] = useState(true);
  const [result, setResult] = useState(null);

  const { id } = useParams()

  const fetchQ = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`http://localhost:4000/api/quiz/take-quiz/${id}`)
      console.log(data)
      setCurrectOptions(Array(data.questions.length).fill(null));
      setQuestion(data.questions);
      setTimer((data.time && data.time !== "OFF") && data.time);

      if (data.quizeType == 'QnA') {
        setResult(0);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchQ();
  }, [])

  const submitHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:4000/api/quiz/save-quiz-result', {
        quizeId: id,
        choosedOptions: correctOptions,
      })

      setResult(data.correctAttempts);
      toast.success(data.message);

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error)
    }
    setCurrentPopup('finish')
    setLoading(false)
  }

  const popupContentStyle = {
    borderRadius: "10px",
    width: window.innerWidth <= 768 ? '100%' : '90%',
    height: window.innerWidth <= 768 ? '100%' : '90%',
  };


  return (
    <>
      <Popup open={isOpen}
        closeOnDocumentClick
        onClose={() => { setIsOpen(false) }}
        contentStyle={popupContentStyle}
      >
        {loading && <Loader />}
        <div>
          {
            currentPopup == 'takeQuize' ?
              <ShowQuizeQuestion
                question={questions[no]}
                length={questions.length}
                time={timer}
                no={no}
                setNo={setNo}
                setOpt={setCurrectOptions}
                correctOptions={correctOptions}
                submitHandler={submitHandler}
              /> :
              <FinishQuize total={questions.length} result={result} />
          }
        </div>
      </Popup >
    </>
  )
}

export default TakeQuize
