import React, { useState, useEffect } from 'react'
import Loader from '../../utils/globalLoader/Loader';
import axios from 'axios';
import Header from './header';
import Style from './dashboard_wrapper.module.css';
import QuizeCard from './quiz_card';
import { toast } from 'react-toastify';

const DashboardWrapper = () => {

  const [loading, setLoading] = useState(false);
  const [headerInfo, setHeaderInfo] = useState({
    totalQuizes: null,
    totalQuestions: null,
    totalImpressions: null
  });
  const [allQuizes, setAllQuizes] = useState([]);

  //function to fetch quizes from api set into respective states
  const fetchQuizes = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`http://localhost:4000/api/quize/get-all`, {
        headers: {
          authorization: localStorage.getItem('authToken')
        }
      })
      setHeaderInfo({
        totalQuizes: data.totalQuizes,
        totalQuestions: data.totalQuestions,
        totalImpressions: data.totalImpressions,
      })
      setAllQuizes(data.quizes);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
    setLoading(false)
  }


  useEffect(() => {
    fetchQuizes();
  }, [])

  return (
    <>
      {loading && <Loader />}

      <div className={Style.DashboardContainer}>
        <div>
          <Header info={headerInfo} />
        </div>
        <div>
          <h1>Trending Quizes</h1>
          <h3>NOTE : A quiz must have atleast 2 impressions to get listed on Trending List</h3>
          <div>
            {
              allQuizes.map((quize, i) => (
                <QuizeCard quizeData={quize} key={i} />
              ))
            }
          </div>
          {allQuizes.length <= 0 && <h2>You haven't created any quiz , Click on Create Quiz to create your first Quiz</h2>}
        </div>
      </div>
    </>
  )
}

export default DashboardWrapper
