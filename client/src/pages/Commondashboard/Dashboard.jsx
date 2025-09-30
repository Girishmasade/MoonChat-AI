import React from 'react'
import  AppHeader from '../../components/CommonDashboard/Header'
import HeroSection from '../../components/CommonDashboard/HeroSection'
import Features from '../../components/CommonDashboard/Features'
import RealTimeCollaboration from '../../components/CommonDashboard/RealTimeCollaboration'
import Card from '../../components/CommonDashboard/Card'
import Footer from '../../components/CommonDashboard/Footer'

const Dashboard = () => {
  return (
    <div className=''>
      <AppHeader/>
      <HeroSection/>
      <Features/>
      <RealTimeCollaboration/>
      <Card/>
      <Footer/>
    </div>
  )
}

export default Dashboard
