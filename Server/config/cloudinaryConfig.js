import { v2 as cloudinary } from 'cloudinary'

export const cloudnaryConfig = async()=>{
    try {
  await cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_CLOUD_API_KEY, 
            api_secret: process.env.CLOUDINARY_CLOUD_SECRET_KEY
          })
          
          console.log("cloudnary connected successfully")
    } catch (error) {
        console.log(error)
    }

}