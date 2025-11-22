import bcrypt from "bcryptjs"
import User from "../models/user.js"




export const register = async()=>{
    try{
        const {username,password} = req.body

        const user = await User.findOne({username:username})
        if(user){
            return res.json({message:"User already exists",status:false});
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            username,
            password:hashedPassword,
            isMfaActive:false,
        });
        console.log("NEw user ",newUser);
        await newUser.save();
        return res.status(201).json({
            message:"User registered successfully",
            status:true,
            newUser
        })

    }catch(error){
        reset2FA.status(500).json({
            error:"Error Registering user",
            message:error
        })
    }

}
export const login = async()=>{

}
export const authStatus = async()=>{

}
export const logout = async()=>{

}
export const setup2FA = async()=>{

}
export const verify2FA = async()=>{

}
export const reset2FA = async()=>{

}
export const getUser = async()=>{

}
