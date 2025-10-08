import React, { useState } from "react";
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
import { ArrowLeft } from "lucide-react";
import NavbarAd from "../admin/NavbarAd";
import { useNavigate } from "react-router-dom";

export default function EditLecture() {
  const [title, setTitle] = useState(
    "Introduction to Docker and Containerization"
  );
  const [isFree, setIsFree] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpdate = () => {
    console.log({ title, isFree, file });
  };

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
            <Button variant="destructive">Remove Lecture</Button>

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
              {file && (
                <p className="text-sm text-gray-500">
                  Selected: <span className="font-medium">{file.name}</span>
                </p>
              )}
            </div>

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
              Update Lecture
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
