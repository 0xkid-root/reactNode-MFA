import express, { json, urlencoded } from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import {DBConnect} from "./config/dbConnect.js"

const app  = express();
const PORT = 9000;
dotenv.config();

DBConnect();

const corsOptions = {
    origin:["http://localhost:3000"],
    Credential:true,
}

app.use(cors(corsOptions));
app.use(json({limit: '100mb'}));
app.use(urlencoded({limit: '100mb'}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:60000*60,
    }
}))

app.use(passport.initialize());
app.use(passport.session());



app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})