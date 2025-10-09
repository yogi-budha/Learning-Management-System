import express from "express"
import { upload } from "../utils/multer.js"
import { uploadMediaToCloudnary } from "../utils/cloudnary.js"

const router = express.Router()

router.route("/upload_video").post(upload.single("videoFile"), async (req,res) => {
    try {
        console.log(req.file)
      const result = await uploadMediaToCloudnary(req.file.path)
      return res.status(200).json({
        data: result,
        success:true,
        message:"successfully upload the video"
      })
      
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        success:false,
        message:"server failed"
      })
    }
  })

export default router