import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Editor from "@/components/Editor";
import NavbarAd from "./NavbarAd";
import { Link, useParams } from "react-router-dom";
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

export default function CourseForm() {
  const [preview, setPreview] = useState(null);
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const isPublished = false;
  const { id } = useParams();
  const [editCourse, { isError, isSuccess, isLoading }] = useEditCourseMutation();
  const {data} = useGetCourseByIdQuery(id)
  const [publishCourse] = usePublishCourseMutation()

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onFileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onCategoryChangeHandler = (value) => {
    setInput({ ...input, category: value });
  };

  const onCourseLevelChangeHandler = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  useEffect(()=>{
    console.log(data)
    if(data){
      setInput({
        courseTitle:data?.course?.courseTitle,
        courseLevel:data?.course?.courseLevel,
        category:data?.course?.category,
        coursePrice:data?.course?.coursePrice,
        subTitle:data?.course?.subTitle,
        description:data?.course?.description,
        courseThumbnail:data?.course?.courseThumbnail,
      })
    }
  },[data])
  const onSubmitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("courseTitle", input.courseTitle);
      formData.append("subTitle", input.subTitle);
      formData.append("description", input.description);
      formData.append("coursePrice", input.coursePrice);
      formData.append("courseLevel", input.courseLevel);
      formData.append("category", input.category);
      formData.append("courseThumbnail", input.courseThumbnail);

      await editCourse({ inputData: formData, courseId: id }).unwrap();
      toast.success("Course updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error updating course");
    }
  };

  useEffect(() => {
    if (isSuccess) toast.success("Successfully updated");
    if (isError) toast.error("Error while updating");
  }, [isSuccess, isError]);

  const publishCourseHandler = async (action)=>{
    console.log(action)

 const res = await publishCourse({courseId:id,query:action})
 console.log(res)
 if(res.data){
  toast.success(res.data.message ||"course published")
 }else{
  toast.error("course not published")
 }
  }
  return (
    <div className="flex flex-col w-[80%] h-full p-4 ml-[18rem]">
      <NavbarAd
        name="Edit Course"
        isSearch={false}
        isFilter={false}
        isCreateCourses={false}
      />
      <div className="flex justify-center">
        <Card className="w-full max-w-3xl shadow-md border rounded-2xl">
          <CardHeader>

            <CardTitle className="text-2xl font-semibold flex items-center justify-between">
              <p>Basic Information</p>
              <Link to={`/admin/dashboard/courses/createCourseForm/${id}/lecture`} className="text-sm text-blue-600 hover:underline">
              Go to Lecture
              </Link>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Make changes to your course here. Click save when you’re done.
            </p>

          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Ex. Fullstack Development"
                className="mt-1"
                name="courseTitle"
                value={input.courseTitle}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                placeholder="Ex. Become a MERN Stack Developer from Zero to Hero"
                className="mt-1"
                name="subTitle"
                value={input.subTitle}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Editor
                name="description"
                value={input.description}
                input={input}
                setInput={setInput}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Category</Label>
                <Select value={input.category} onValueChange={onCategoryChangeHandler}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                    <SelectItem value="Full Stack Development">Full Stack Development</SelectItem>
                    <SelectItem value="MERN Development">MERN Development</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="MySQL">MySQL</SelectItem>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="Node JS">Node JS</SelectItem>
                    <SelectItem value="React Native">React Native</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Course Level</Label>
                <Select value={input.courseLevel} onValueChange={onCourseLevelChangeHandler}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a course level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="499"
                  className="mt-1"
                  name="coursePrice"
                  value={input.coursePrice}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div>
              <Label>Course Thumbnail</Label>
              <Input type="file" className="mt-1" onChange={onFileChangeHandler} />
            </div>

            {preview ? (
              <img
                src={preview }
                alt="preview"
                className="w-40 h-40 object-contain object-center"
              />
            ):<img
                src={input.courseThumbnail }
                alt="preview"
                className="w-40 h-40 object-contain object-center"
              /> }

            <div className="flex justify-end space-x-3">
              <Button variant="outline">Cancel</Button>
              <Button onClick={onSubmitHandler} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
              <Button variant="destructive">Remove Course</Button>
              <Button disabled={(data?.course?.Lectures)==0} className="bg-green-600 hover:bg-green-700" onClick={()=>publishCourseHandler(data?.course?.published ? "false" : "true")}>
                {data?.course?.published  ? "UnPublish" : "publish"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
