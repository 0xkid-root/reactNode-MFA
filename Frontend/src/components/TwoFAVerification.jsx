import { useState } from "react";
import { verify2FA,reset2FA } from "../service/authApi";


const TwoFAVerification = ({ onVerifySuccess, onResetSuccess }) => {


    const [otp, setOtp] = useState("");
    const [error,setError] = useState("");



  const handleTokenVerification = async (e) => {
    e.preventDefault();
    try{
        const {data}= await verify2FA(otp);
        console.log("2FA verification response data:",data);
        onVerifySuccess(data);

    }catch(error){
        setOtp("");
        console.log("Error during 2FA verification:",error);
        setError("Invalid TOTP. Please try again.");
    }
  };


  const handleReset = async(e)=>{
    e.preventDefault();
    try{
        const {data} = await reset2FA();
        console.log("2FA reset response data:",data);
        onResetSuccess(data);

    }catch(error){
        console.log("Error during 2FA reset:",error);
        setError(error)
    }


  };




  return (
    <form
      onSubmit={handleTokenVerification}
      className="bg-white rounded-lg w-full shadow-md max-w-sm mx-auto"
    >
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">Validate ToTP</h2>
      </div>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="text-center text-gray-500">
        Please enter 6-digit Time based OTp to verify 2FA authentication
      </p>

      <div className="p-6">
        <div className="mb-4">
          <label className="text-gray-600 text-sm">TOTP</label>
          <input
            type="text"
            label="TOTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter you TOTP"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}


        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold p-2 rounded mb-3"
        >
          {" "}
          Verify TOTP
        </button>

        <button
          type="button"
          className="w-full bg-slate-500 text-white font-bold p-2 rounded"
          onClick={handleReset}
        >
          {" "}
          Reset 2FA
        </button>

      </div>
    </form>
  );
};

export default TwoFAVerification;
