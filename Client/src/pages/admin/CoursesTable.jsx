
import React from 'react'
import NavbarAd from './NavbarAd'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useGetCoursesQuery } from '@/features/api/courseApi'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { Link } from 'react-router-dom'




function CoursesTable() {
    const {data} = useGetCoursesQuery()
    console.log(data)
  return (
    <div  className="flex flex-col w-[80%] h-full p-4 ml-[18rem]">
        <NavbarAd/>
<div className='w-[80%] flex items-center justify-center ml-18'>

        <Table >
      <TableCaption>A list of your recent Courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Course Title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.createrCourses?.map((course) => (
          <TableRow key={course._id}>
            <TableCell className="font-medium">{course?.coursePrice ?? "NA" }</TableCell>
            <TableCell><Button className={"p-2 py-0 cursor-pointer"}>{course?.pending ? "Publish":"Draft"}</Button ></TableCell>
            <TableCell>{course?.courseTitle}</TableCell>
            <TableCell className="text-right"><Link to={`createCourseForm/${course._id}`}><Button  className={"cursor-pointer"}><Edit/></Button></Link></TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
</div>

    </div>
  )
}

export default CoursesTable