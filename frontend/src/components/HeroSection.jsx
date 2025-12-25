import React from 'react'
import { Highlight } from './ui/hero-highlight'

export default function HeroSection() {
  return (
    <div className='mb-24 2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-lg mx-auto mt-7 md:mt-20 sm:px-0 px-2'>

      <div className="flex flex-col md:flex-row items-center justify-center md:justify-baseline lg:justify-between w-full xl:w-5/6 mx-auto">
        {/* Right section */}
        <div className="">
          <img src="/404-computer.svg" alt="web3-img" className='w-full md:w-3/4 lg:w-full' />
        </div>

        {/* Left section */}
        <div className="space-y-5 font-bold">
          <div>
            <h3 className='text-4xl md:text-3xl lg:text-5xl text-cyan-500'>Design studio</h3>
            <h3 className='text-4xl md:text-3xl lg:text-4xl'>for the</h3>
          </div>
          <Highlight className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl text-cyan-500 mt-5">web3 world!</Highlight>
        </div>
      </div>
    </div>
  )
}