import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import NavbarAd from "../admin/NavbarAd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { useDeleteLectureMutation, useEditLectureMutation, useGetLectureQuery } from "@/features/api/courseApi";

export default function EditLecture() {
  const [title, setTitle] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [file, setFile] = useState(null);
  const [mediaProgress,setMediaProgress] = useState(false)
  const [uploadMedia,setuploadMedia] = useState(0)
  const [uploadVideoInfo,setUploadVideoInfo] = useState(null)
  const [btnDisable,setBtnDisable] = useState(true)
  const navigate = useNavigate();
  const {courseId,lectureId} = useParams()

  const [editLecture,{isSuccess,isError,isLoading}] = useEditLectureMutation()
  const {data} = useGetLectureQuery(lectureId)
  const [removeLecture,{isSuccess:successRemoveLecure,isError:errorRemoveLecture,isLoading:loadingdelete}] = useDeleteLectureMutation()

  useEffect(()=>{
    if(data){
      setTitle(data.lecture.lectureTitle)
      console.log(data)
      setIsFree(data.lecture.isPreviewFree)
      setUploadVideoInfo({videoUrl:data.lecture.videoUrl})
    }
  },[data])

  useEffect(()=>{
    if(successRemoveLecure){
      toast.success("Lecture remove successfully")
    }
    if(errorRemoveLecture){
      toast.success("error while remove Lecture")
    }
  },[successRemoveLecure,errorRemoveLecture])



const media_url = 'http://localhost:5000/api/media'

  const handleFileChange =async (e) =>{ 
    const selectedFileChange = e.target.files[0]
    console.log(selectedFileChange)
    if(selectedFileChange){
      setFile(selectedFileChange)

      const formData = new FormData()
      formData.append("videoFile",selectedFileChange)
      setMediaProgress(true)
      try {
         const res = await axios.post(`${media_url}/upload_video`,formData,{
          onUploadProgress:({loaded,total})=>{
            setuploadMedia(Math.round((loaded*100)/total))
          }
         })
      if(res.data.success){
        setUploadVideoInfo({videoUrl:res.data.data.secure_url, publicId:res.data.data.public_id})
        console.log(res)
        setBtnDisable(false)
        toast.success("successfully upload the video")
      }
      } catch (error) {
        console.log(error.message)
        toast.error("video upload failed")
      }finally{
        setMediaProgress(false)
      }
    }
   

  };

  const handleUpdate = async() => {
    console.log({ title, isFree ,file});
   await editLecture({lectureTitle:title,isFree,file,publicId:uploadVideoInfo.publicId,videoUrl:uploadVideoInfo.videoUrl,courseId,lectureId})
  };

  useEffect(()=>{
    if(isSuccess){
      toast.success("Lecture Updated Successfully")
     
    }
    if(isError){
      toast.error("Error while update Lecture")
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
      <div className="max-w-3xl  py-10 px-4">
        {/* Back button */}
        <div
          className="flex items-center gap-2 mb-6 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
          <h1 className="text-xl font-semibold">Update Your Lecture</h1>
        </div>

        {/* Card */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle>Edit Lecture</CardTitle>
            <CardDescription>
              Make changes and click save when done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Remove button */}
            <Button variant="destructive" onClick={()=>{removeLecture(lectureId), navigate(-1)}}>          {
              loadingdelete ? <>
              <Loader2 className="animate-spin"/> Please wait
              </>: "Remove Lecture"
             }</Button>

            {/* Title input */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter lecture title"
              />
            </div>

            {/* Video file upload */}
            <div className="space-y-2">
              <Label htmlFor="video">
                Video <span className="text-red-500">*</span>
              </Label>
              <Input
                id="video"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
              />
            </div>

            {
              mediaProgress && <>
              <Progress value={uploadMedia}/>
              <p>{uploadMedia}% uploadProgress</p>
              </>
            } 

            {/* Free video switch */}
            <div className="flex items-center space-x-3">
              <Switch
                id="isFree"
                checked={isFree}
                onCheckedChange={setIsFree}
              />
              <Label htmlFor="isFree">Is this video FREE?</Label>
            </div>

            {/* Update button */}
            <Button onClick={handleUpdate} className="w-full">
             {
              isLoading ? <>
              <Loader2 className="animate-spin"/> Please wait
              </>: "UpdateLecture"
             }
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
