import React from 'react'
import { Link } from 'react-router-dom'

const Card = () => {
  return (
    <div className='mx-auto lg:my-10 px-4 max-w-7xl 
    bg-gradient-to-r from-[#0A2540] to-[#020617] 
    border border-[#F5D06F]/20 rounded-xl shadow-xl'>

      <div className="grid lg:grid-cols-2 p-8 justify-center items-center min-h-40">
        
        {/* TEXT */}
        <div className="flex flex-col">
          <h1 className='text-4xl font-extrabold leading-tight 
          bg-gradient-to-r from-white to-[#F5D06F] 
          bg-clip-text text-transparent'>
            Ready to start chatting?
          </h1>

          <p className="text-md text-gray-300 mt-2">
            Join free today and invite your team in just minutes. 
            Collaborate, chat, and connect with style 🚀
          </p>
        </div>

        {/* BUTTON */}
        <div className="flex lg:justify-end justify-center items-center lg:mt-0 mt-4">
          <Link 
            to={"/signup"}  
            className='px-8 py-3 rounded-lg font-semibold 
            bg-gradient-to-r from-[#F5D06F] to-[#E6B85C] 
            text-black shadow-lg 
            hover:shadow-[0_0_15px_#F5D06F] 
            hover:scale-105 
            transition-all duration-300 ease-in-out'>
            Sign Up Free
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Card