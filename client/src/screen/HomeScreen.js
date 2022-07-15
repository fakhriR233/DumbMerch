import React from 'react'
import Header from '../components/Header'
import HomeScreenBody from '../components/HomeScreenBody/HomeScreenBody'
import { useLocation } from 'react-router-dom'

const HomeScreen = () => {
  const location = useLocation();

  return (
    <div>
        <Header/>
        <HomeScreenBody />
    </div>
  )
}


export default HomeScreen