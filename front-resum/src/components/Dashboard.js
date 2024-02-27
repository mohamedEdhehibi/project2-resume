import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../redux/actiontype'

const Dashboard = () => {
  useEffect(()=>{
    console.log('dashboard');
  },[])
  return (
    <div className='content'>Dashboard</div>
  )
}

export default Dashboard