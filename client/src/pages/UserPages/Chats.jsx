import React, { useState } from 'react'
import ChatList from '../../components/User/ChatList'
import UserMessageHeader from '../../components/User/UserMessageHeader'

const Chats = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className='flex m-2 h-[100%]'>
      <ChatList selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      <div className="w-px bg-gray-300 mx-2"/>
      <UserMessageHeader selectedUser={selectedUser}/>
    </div>
  )
}

export default Chats
