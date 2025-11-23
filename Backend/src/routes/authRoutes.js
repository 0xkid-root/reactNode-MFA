import { Router } from "express";
import passport from "passport";
import { register, login, authStatus, logout, setup2FA, verify2FA, reset2FA } from "../controllers/userAuth.Controllers.js";
 

const router = Router();


//registration 
router.post("/register",register)

//login
router.post("/login",passport.authenticate("local"),login)
//auth status
router.get("/authstatus",authStatus)
//logout routes
router.get("/logout",logout)

//2fa setup
router.post("/2fa/setup",
(req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.status(401).json({message:"Unauthorized access!"})
},
 setup2FA)

//2fa verify route 

router.post("/2fa/verify",
    (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.status(401).json({message:"Unauthorized access!"})
},
    verify2FA)

//reset route is here:---

router.post("/2fa/reset",
    (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.status(401).json({message:"Unauthorized access!"})
},
    reset2FA)

export default router;

