import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import NavbarAd from './NavbarAd'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useCreateCoursessMutation } from '@/features/api/courseApi'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

function CreateCourses() {
  const [createCourseCall,{data,isSuccess,isLoading} ] = useCreateCoursessMutation()
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState("")
  
  const createHandler = async()=>{
    await createCourseCall({courseTitle:title,category})
  }
  console.log(data)

  useEffect(()=>{
    if(isSuccess){
      toast.success("Course Create Successfully")
    }
  },[data,isSuccess])

  return (
    
    <div className="flex flex-col w-[80%] h-full p-4 ml-[18rem]">
      <NavbarAd name = "Create A Course" isSearch={false} isFilter={false} isCreateCourses={false} />

      <div className='w-[70%] ml-10 '>

      <h1 className='font-semibold text-lg'>lets add the course, add some basic courses details for your new Courses</h1>
      <p className='text-sm text-gray-500'>Add some basic details</p>

      <div className='flex flex-col gap-2 mt-4 tracking-wider'>
        <label htmlFor="title" className='font-bold' >Title:</label>
        <Input type="text " placeholder="Enter the title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
      </div>

      <div className='mt-4'>
        <p className='font-bold tracking-wider pb-2'>Category:</p>
      <Select value={category} onValueChange={(value) => setCategory(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue  placeholder="Select a courses " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="fullStack">FullStack Development</SelectItem>
          <SelectItem value="Mern">Mern Development</SelectItem>
          <SelectItem value="database">Database</SelectItem>
          <SelectItem value="advance">Advanced Concept</SelectItem>
          <SelectItem value="pineapple">Others</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

      </div>

      {
        isLoading ? <Button > <Loader2 className='w-4 h-4 animate-spin'/>Please Wait</Button> :       <Button className="mt-3" onClick={createHandler}>Create</Button>
      }


      </div>

    </div>
  )
}

export default CreateCourses