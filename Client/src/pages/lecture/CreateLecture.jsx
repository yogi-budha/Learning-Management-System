import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Edit } from "lucide-react";
import NavbarAd from "../admin/NavbarAd";
import { Link, useParams } from "react-router-dom";

const lecturesData = [
  "Introduction to Docker and Containerization",
  "Setting Up Your Docker Environment",
  "Understanding Docker Images and Containers",
  "Building Custom Docker Images with Dockerfile",
  "Managing Multi-Container Applications with Docker Compose",
];

export default function CreateLecture() {
    const  { id } = useParams()
    console.log(id)
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
          />
        </div>
        <div className="flex gap-2 mt-6">
            <Link to={`/admin/dashboard/courses/createCourseForm/${id}`}>
            
          <Button variant="outline">Back to course</Button>
            </Link>
          <Button>Create Lecture</Button>
        </div>
      </div>

      {/* Lecture List */}
      <div className="space-y-3 mt-6">
        {lecturesData.map((lecture, index) => (
          <Card key={index} className="flex flex-row  items-center justify-between p-4">
            <CardContent className="p-0">
              <span className="font-semibold">
                Lecture - {index + 1}: {lecture}
              </span>
            </CardContent>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="sm" className="p-1">
                  <Edit className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Lecture</TooltipContent>
            </Tooltip>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
}
