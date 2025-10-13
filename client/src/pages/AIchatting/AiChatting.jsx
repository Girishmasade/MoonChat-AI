import React from 'react'
import Header from '../../components/Ai components/Header'
import MessageSection from '../../components/Ai components/MessageSection'
import SendMessageSection from "../../components/Ai components/SendMessageSection";

const AiChatting = () => {
  return (
    <div className='flex flex-col gap-3 h-[100%]'>
      <Header/>
      <MessageSection/>
    </div>
  )
}

export default AiChatting
