import React from 'react'
import { FeaturesData } from '../../utils/features'

const Features = () => {
  return (
    <div className='mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl'>
      
      <div className="flex flex-col justify-center items-center gap-2">
        
        {/* HEADING */}
        <h1 className="text-4xl font-bold leading-loose 
        bg-gradient-to-r from-white to-[#F5D06F] 
        bg-clip-text text-transparent">
          Everything you need to chat
        </h1>

        <p className="text-md text-gray-400 mt-3">
          Powerful features designed for teams of any size.
        </p>

        {/* CARDS */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
          
          {FeaturesData.map((item, index) => {
            return (
              <div
                key={index}
                className="group rounded-2xl border border-[#F5D06F]/20 
                bg-[#0A2540]/40 backdrop-blur-md p-6 shadow-md 
                hover:shadow-xl hover:-translate-y-2 
                hover:border-[#F5D06F]/50
                transition-all duration-300 ease-in-out w-full h-full"
              >
                
                {/* ICON */}
                <span className='text-3xl'>{item.emoji}</span>

                {/* TITLE */}
                <h1 className='mt-4 text-lg font-semibold text-[#F5D06F]'>
                  {item.title}
                </h1>

                {/* DESC */}
                <p className="mt-2 text-sm text-gray-300">
                  {item.description}
                </p>

              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default Features