import React from 'react'
import { FeaturesData } from '../../utils/features'

const Features = () => {
  return (
    <div className='mx-auto px-4 sm:px-6 lg:px-16 py-12 md:py-20 max-w-7xl'>
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-4xl font-bold leading-loosed">Everything you need to chat</h1>
        <p className="text-md text-gray-400 mt-3">Powerful features designed for teams of any size.</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {
            FeaturesData.map((item, index) => {
              return (
                <div key={index} className="group rounded-2xl border bg-transparent dark:bg-card p-6 shadow-md hover:shadow-xl 
                 hover:-translate-y-2 transition-all duration-300 ease-in-out w-full h-full">
                  <span className='text-3xl'>{item.emoji}</span>
                  <h1 className='mt-4 text-lg font-semibold'>{item.title}</h1>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Features
