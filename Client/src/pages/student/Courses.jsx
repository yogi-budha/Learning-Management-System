import React from 'react'
import CourseCard from './CourseCard'
import CardSkeleton from './cardSkeleton'

function Courses() {
  let list = [1,2,3,4,5,6,7]
  const isLoading = true;
  return (
        <div className='w-full  pt-10 px-10  flex items-center flex-col'>
          <div className='w-[80%]'>

        <h1 className='text-2xl font-bold mx-auto text-center mb-10'>Courses</h1>
        <div className='w-full flex justify-center flex-wrap gap-5'>
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
  )
}

export default Courses