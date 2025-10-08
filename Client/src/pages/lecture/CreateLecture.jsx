import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Edit, Loader2 } from "lucide-react";
import NavbarAd from "../admin/NavbarAd";
import { Link, useNavigate, useParams } from "react-router-dom";
import {  useCreateLectureMutation, useGetCourseLectureQuery } from "@/features/api/courseApi";
import { toast } from "sonner";



export default function CreateLecture() {
  const  navigate = useNavigate();
  const [lectureTitle,setLectureTitle] = useState("")
    const  { id } = useParams()
    const [createUser,{isLoading,isError,isSuccess}] = useCreateLectureMutation()
   const {data}= useGetCourseLectureQuery(id)

    const onSubmitHandler = async()=>{
      console.log(lectureTitle)
    await createUser({inputData:{lectureTitle},courseId:id})
    }

    console.log(data)
    

    useEffect(()=>{
      if(isSuccess){
        toast.success("Lecture Created Successfully")
      }
      if(isError){
        toast.error("Failed to created lecture")
      }
    },[isSuccess,isError])

    
  return (

    <div className="flex flex-col w-[80%] h-full p-4 ml-[18rem]">
        <NavbarAd
                name="Create Lecture"
                isSearch={false}
                isFilter={false}
                isCreateCourses={false}
              />
    
    <div className="max-w-4xl ml-6 py-10 px-4">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Let's add lectures, add some basic details for your new lecture</h1>
        <p className="text-sm text-gray-500 mt-1">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>

      {/* Title Input */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1">
          <Label htmlFor="lecture-title">Title</Label>
          <Input
            id="lecture-title"
            placeholder="Your Lecture Title Name"
            className="mt-1"
            name="lectureTitle"
            value={lectureTitle}
            onChange={(e)=>setLectureTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-2 mt-6">
            <Link to={`/admin/dashboard/courses/createCourseForm/${id}`}>
            
          <Button variant="outline">Back to course</Button>
            </Link>
            {
              isLoading ? <Button><Loader2 />please wait</Button>:<Button onClick={onSubmitHandler}>Create Lecture</Button>
            }
          
        </div>
      </div>

      {/* Lecture List */}
      <div className="space-y-3 mt-6">
        {data?.course?.Lectures?.map((lecture, index) => (
          <Card key={index} className="flex flex-row  items-center justify-between p-4">
            <CardContent className="p-0">
              <span className="font-semibold">
                Lecture - {index + 1}: {lecture.lectureTitle}
              </span>
            </CardContent>
            <Tooltip>
              <TooltipTrigger>
                <Button onClick={()=>navigate(`${lecture._id}`)} variant="ghost" size="sm" className="p-1">
                  <Edit className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent >Edit Lecture</TooltipContent>
            </Tooltip>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
}
