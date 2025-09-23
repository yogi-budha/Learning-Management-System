import React from 'react'
import CardSkeleton from './cardSkeleton'
import CourseCard from './CourseCard'

function MyLearning() {
    const isLoading = false
    const list = [1,2,3,4   ]
  return (
    <div className='w-full min-h-screen mt-24 flex flex-col items-center '>
        <div className='w-[90%]'>
            <p className='font-semibold text-lg'>My Learning - Enrolled Courses</p>
            <div>
            <div className='w-full flex justify-center flex-wrap gap-5 py-5'>
          {
            isLoading ? <div className='grid grid-cols-3 gap-5 w-full'>
           {Array.from({ length: 5 }).map((_, i) => (
            
            <CardSkeleton key={i}/>
          ))}
            </div>:list.map((_,i)=><CourseCard key={i}/>)
        
          }
   
          
        </div>
            </div>
        </div>
    </div>
  )
}

export default MyLearning