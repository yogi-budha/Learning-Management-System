import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
    return  res.status(400).json({
        success: false,
        message: "please fill all the field",
      });
    }
      const user = await User.findOne({ email });
      if (user) {
      return  res.status(400).json({
          success: false,
          message: "User with this email is already exist",
        });
      }
      const hashPassword = await bcrypt.hash(password, 10);
     const newUser =  await User.create({ name, email, password: hashPassword });
      await  generateToken(res,newUser,`Welcome  ${newUser.name}`)
      // return  res.status(200).json({
      //   success:true,
      //   message:"user created/registered successfully"
      // })
  } catch (error) {
   return res.status(400).json({
      success: false,
      message: "Server failed",
    });
  }
};

export const login = async (req, res) => {
 try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "please fill all the field",
      });
    }
  
    const user = await User.findOne({ email });

    if(!user){
      res.status(400).json({
          success: false,
          message: "Incorrect email or password",
        });
    }
  
    const isMatchPassword = await bcrypt.compare(password,user.password)
    if(!isMatchPassword){
    return  res.status(400).json({
          success: false,
          message: "Incorrect email or password",
        });
      }
      await generateToken(res,user,`welcome back ${user.name}`)

    //  return  res.status(200).json({
    //      success:true,
    //      message:"login successfully"
    //    })
 } catch (error) {
    console.log(error);
  return  res.status(400).json({
      success: false,
      message: "Server failed",
    });
 }
};

export const logout = async (req,res)=>{
  try {
    return res.status(200).cookie("token","",{maxAge:0}).json({
      success:true,
      message:"logout successfully"
    })
    
  } catch (error) {
    return  res.status(400).json({
      success: false,
      message: "Server failed",
    });
  }
}

export const getUserDetails = async (req,res)=>{
  try {
    const id = req.id
    const user = await User.findById(id)
    console.log(user)
    if(!user){
      return res.status(400).json({
        success:false,
        message:"User not found"
      })
    }
    return res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    return  res.status(400).json({
      success: false,
      message: "Server failed",
    });
    
  }
}
