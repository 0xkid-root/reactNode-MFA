import bcrypt from "bcryptjs"
import User from "../models/user.js"
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";


export const register = async(req,res)=>{
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
        return res.status(500).json({
            error:"Error Registering user",
            message:error.message
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
        return res.status(500).json({
            error:"Error logging in",
            message:error.message
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
export const logout = async(req,res)=>{
    if(!req.user) return res.status(401).json({message:"Unauthorized access!"})

    req.logout((err)=>{
        if(err){return next(err)}

        req.session.destroy((err)=>{
            if(err){
                return next(err);
            }
            //clear cookie here
            res.clearCookie("connect.sid");
            return res.status(200).json({message:"User logged out successfully!"});

        })

    })

}
export const setup2FA = async(req,res)=>{
    try{
        console.log("the req.user is :::",req.user);
        const user = req.user;
        var secret = speakeasy.generateSecret();
        console.log("speakeasy secreat is here:",secret);
        user.twoFactorSecret = secret.base32;
        user.isMfaActive = true;
        await user.save();
        const url = speakeasy.otpauthURL({
            secret:secret.base32,
            label:`${req.user.username}`,
            issuer:"www.binance.com",
            encoding:"base32",
        })
        const qrImageUrl = await qrCode.toDataURL(url);
        return res.status(200).json({
            secret:secret.base32,
            url:url,
            qrCode:qrImageUrl
        })


    }catch(error){
        return res.status(500).json({error:"Error setting up 2fa",message:error.message})
    }

}
export const verify2FA = async(req,res)=>{
    try{
        const {token} = req.body;
        const user = req.user;

        const verified = speakeasy.totp.verify({
            secret:user.twoFactorSecret,
            encoding:"base32",
            token,
        })

        if(verified){
            const jwtToken = jwt.sign(
                {username:user.username},
                process.env.JWT_SECRET,
                {
                    expiresIn:"1hr"
                }
            );
            return res.status(200).json({message:"2FA Successful!!",token:jwtToken});

        }else{
            return res.status(400).json({message:"Invalid 2FA token!"})
        }
    }catch(error){
        return res.status(500).json({error:"Error verifying 2fa",message:error.message})
    }

}
export const reset2FA = async(req,res)=>{
    try{
        const user = req.user;
        user.twoFactorSecret = "";
        user.isMfaActive = false;
        await user.save();
        res.status(200).json({message:"2FA reset successful!"});

    }catch(error){
        return res.status(500).json({error:"Error resetting 2fa",message:error.message})
    }

}
export const getUser = async(req,res)=>{
    try{
        const user = req.user;
        res.status(200).json({user});
    }catch(error){
        return res.status(500).json({error:"Error fetching user",message:error.message})
    }
}