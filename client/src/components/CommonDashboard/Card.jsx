import React from 'react'
import { Link } from 'react-router-dom'

const Card = () => {
  return (
     <div className='mx-auto lg:my-10 px-4 max-w-7xl bg-gradient-to-r from-purple-400 to-purple-700 rounded-xl '>
      <div className="grid lg:grid-cols-2 p-8 justify-center items-center min-h-40">
        <div className="flex flex-col">
          <h1 className='text-4xl font-extrabold leading-tight'>Ready to start chatting?</h1>
           <p className="text-md text-gray-800">
              Join free today and invite your team in just minutes. 
              Collaborate, chat, and connect with style 🚀
            </p>
        </div>

        <div className="flex lg:justify-end justify-center items-center lg:mt-0 mt-4">
          <Link to={"/signup"}  className='btn bg-gray-800 text-white px-8 py-3 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out '>sign Up Free</Link>
        </div>
      </div>
    </div>
  )
}

export default Card
