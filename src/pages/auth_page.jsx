import React, { useEffect, useState } from 'react'
import Signup from '../components/auth_components/signup'
import Login from '../components/auth_components/login';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [authType, setAuthType] = useState('sign-up');

  const changeTypeFun = (val) => {
    setAuthType(val);
  }

  useEffect(() => {
    const jwtToken = localStorage.getItem('authToken');
    if (jwtToken) {
      navigate('/dashboard')
    }
  }, [])

  return (
    <>
      {
        authType == 'sign-up' ? <Signup authType={authType} changeType={changeTypeFun} /> :
          <Login authType={authType} changeType={changeTypeFun} />
      }
    </>
  )
}

export default AuthPage
