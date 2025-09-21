import jwt from "jsonwebtoken"

export const generateToken =  (res,user,message)=>{
    const token =  jwt.sign({user_id:user._id},process.env.SECREAT_KEY,{
        expiresIn:"1d"
    })

    res.status(200).cookie("token",token,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:24*60*60*1000
    }).json({
        success:true,
        message,
        user
    })
    

}