import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import {Strategy  as LocalStrategy} from "passport-local";



passport.use(new LocalStrategy(async (username, password, done) =>
     {
    try {
        const user = await User.findOne({username})
        if(!user) return done(null, false,{message:"user not found!"});
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) return(null,user);
        else return done(null,false,{message:"incorrect password"})


        }catch(error){
            return done(error)
    }
  } 
));
