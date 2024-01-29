import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../components/side_bar/side_bar';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem('authToken');
    if (!jwtToken) {
      navigate('/auth');
    } else {
      navigate('/dashboard')
    }
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div>
        <SideBar />
      </div>
      <div style={{ width: '82%', height: '100%', backgroundColor: '#EDEDED' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default HomePage;
