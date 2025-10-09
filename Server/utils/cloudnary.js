import { v2 as cloudinary } from 'cloudinary'

export const uploadMediaToCloudnary = async (file)=>{
    try {
       const res =  await cloudinary.uploader.upload(file,{
            resource_type:'auto'
        })
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
        
    }
}
export const deleteMediaFromCloudnary = async (publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log(error)
        
    }
}
export const deleteVideoFromCloudnary = async (publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId,{
            resource_type:video
        })
    } catch (error) {
        console.log(error)
        
    }
}