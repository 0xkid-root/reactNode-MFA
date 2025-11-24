import React from "react";

const LoginForm = ()=>{
    return (

        <form className="bg-white rounded-lg w-full shadow-md max-w-sm mx-auto" >
            <div className="pt-6">
                <h2 className="text-3xl text-center font-extralight">LoginForm</h2>

            </div>
            <hr className="text-gray-200 mt-6 mb-6"/>
            <p className="text-center text-gray-500">We are gald to see you again!</p>

            <div className="p-6">
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Username</label>
                    <input type="text" />

                </div>
            </div>


        </form>

    )
}

export default LoginForm;