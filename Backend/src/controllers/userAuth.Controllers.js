import bcrypt from "bcryptjs"
import User from "../models/user.js"
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";




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
export const login = async(req,res)=>{
    try{
        console.log("the auth status",req.user)
        res.status(200).json({
            message:"User logged in success!",
            username:req.user.username,
            isMfaActive:req.user.isMfaActive
        })

        
    }catch(error){
        reset2FA.status(500).json({
            error:"Error logging in",
            message:error
        })
    }

}
export const authStatus = async(req,res)=>{
    if(req.user){
        return res.status(200).json({
            message:"User logged in success!",
            username:req.user.username,
            isMfaActive:req.user.isMfaActive
        })
    }else{
        return res.status(200).json({
            message:"Unauthorized access!",
        })
    }

}
export const logout = async()=>{
    if(!req.user) res.status(401).json({message:"Unauthorized access!"})

    req.logout((err)=>{
        if(err) return res.status(400).json({message:"user not logout"});
        res.status(200).json({message:"Logout Success!"});

    })

}
export const setup2FA = async()=>{
    try{
        console.log("the req.user is :::",req.user);
        const user = req.user;
        var secret = speakeasy.generateSecret();
        console.log("speakeasy secreat is here:",secret);
        user.twoFactorAuthSecret = secret.base32;
        user.isMfaActive = true;
        await user.save();
        const url = speakeasy.otpauthURL

    }catch(error){
        return res.status(500).json({error:"Error setting up 2fa",message:error})
    }

}
export const verify2FA = async()=>{

}
export const reset2FA = async()=>{

}
export const getUser = async()=>{

}
