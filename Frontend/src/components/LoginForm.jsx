import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { register, loginUser } from "../service/authApi"

const LoginForm = ({onLoginSuccess})=>{

    const [isRegister,setIsRegister] = useState(false);
    const [username ,setUsername]= useState("");
    const [password,setPassword]= useState("");
    const [error,setError]= useState("");
    const [confirmPassword,setConfirmPassword]= useState("");
    const [message,setMessage] = useState("")


    const handleRegister = async(e)=>{
        e.preventDefault(); // Prevent form submission refresh
        try{
            const {data} = await register(username,password);
            console.log("user data is here:L",data);
            setIsRegister(false);
            setMessage(data.message);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setMessage("");
            
        }catch(error){
            console.log("something error",error);
            setError("something went wrong during user register");
        }

    }

    const handleLogin =async (e)=>{
        e.preventDefault(); // Prevent form submission refresh
        try{
            const {data} = await loginUser(username,password);
            console.log("login data is here:",data);
            setMessage(data.message);
            setUsername("");
            setPassword("");
            onLoginSuccess(data);
            
            // Handle successful login here
        }catch(error){
            console.log("error is here:",error);
            setUsername("");
            setPassword("");
            setMessage("");
            setError("Invalid username or password");
        }
    }

    const handleRegisterToggle = async()=>{
        try{
            setIsRegister(!isRegister);
            setError("");
            setMessage("");

        }catch(error){
            console.log(error);
        }

    }

    return (

        <form onSubmit={isRegister ? handleRegister : handleLogin} className="bg-white rounded-lg w-full shadow-md max-w-sm mx-auto" >
            <div className="pt-6">
                <h2 className="text-3xl text-center font-extralight">{isRegister ? "Create Account" : "Login"}</h2>

            </div>
            <hr className="text-gray-200 mt-6 mb-6"/>
            <p className="text-center text-gray-500">{isRegister ? "looks like you are new here" :"We are gald to see you again!"}</p>

            <div className="p-6">
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Username</label>
                    <input type="text" label="Username" value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full p-2 border rounded mt-2"  placeholder="Enter you username" required/>

                </div>

                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Password</label>
                    <input type="password" label="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border rounded mt-2"  placeholder="Enter you password" required/>

                </div>
                {
                    isRegister ? (<div className="mb-4">
                    <label className="text-gray-600 text-sm">Confirm Password</label>
                    <input type="password" label="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="w-full p-2 border rounded mt-2"  placeholder="Enter you password" required/>

                </div>) : ("")
                }

                {
                    error && <p className="text-red-500 text-sm">{error}</p>
                }

                {
                    message && <p className="text-green-500 text-sm">{message}</p>
                }

                
                <button type="submit" className="w-full bg-blue-500 text-white font-bold p-2 rounded"> {isRegister?"Register":"Login"}</button>
                <div>
                    <p className="pt-4 text-center text-gray-600 text-sm">
                        {
                            isRegister ? "Already have an account" : "Don't have an account?"} {" "} <Link to="" onClick={handleRegisterToggle}>{isRegister ? "Login" :"create Account"}</Link>
                        
                        
                        
                        </p>
                </div>
            </div>


        </form>

    )
}

export default LoginForm;