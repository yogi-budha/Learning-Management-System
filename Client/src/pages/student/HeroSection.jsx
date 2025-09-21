import { Button } from '@/components/ui/button'
import React from 'react'

function HeroSection() {
  return (
    <div className='w-full py-10 mt-16 bg-gradient-to-r bg-blue-400 to-blue-700 flex justify-between flex-col gap-6'>
        <div className='text-white mx-auto '>
            <h1 className='font-bold text-4xl  '>Find the best courses for you</h1>
            <p className='text-gray-300 text-sm pt-3'>Discover, learn & upskill with our wide range of courses</p>
        </div>
        <div className='flex items-center justify-center mx-auto   w-[600px]'>
            <input type="text" className='bg-white px-4 py-3 rounded-l-full w-[80%] text-gray-900 focus-visible:ring-0 placeholder:text-gray-400 ' placeholder='Search courses' />
            <Button className='bg-blue-700 px-7 text-md py-6 rounded-r-full hover:bg-blue-500 '>Search</Button>
        </div>
        <Button className='mx-auto bg-gray-200 text-black px-7 text-md py-6 hover:bg-gray-300 '>Explore Courses</Button>

    </div>
  )
}

export default HeroSection