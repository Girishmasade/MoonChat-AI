import React, { useState } from 'react'
import ChatList from '../../components/User/ChatList'
import UserMessageHeader from '../../components/User/UserMessageHeader'
import { useSelector } from 'react-redux'

const Chats = () => {
  const selectedUser = useSelector((state) => state.chat.selectedUser)
  // console.log(selectedUser);
  
  return (
    <div className='flex m-2 h-[100%]'>
      <ChatList selectedUser={selectedUser}/>
      <div className="w-px bg-gray-300 mx-2"/>
      <UserMessageHeader selectedUser={selectedUser}/>
    </div>
  )
}

export default Chats
