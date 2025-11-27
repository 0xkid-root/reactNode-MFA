const TwoFaSetup = () => {
  return (
    <div className="bg-white rounded-lg w-full shadow-md max-w-sm mx-auto">
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">
          Turn on 2FA Verification
        </h2>
      </div>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="text-center text-gray-500">
        Scan the QR code below using an authenticator app to enable
      </p>

      <div className="p-6">
        <div className="flex justify-center">
          <img src="" alt="2FA image!" className="mb-4 border rounded-md" />
        </div>

        <div className="flex-flex-center mt-3 mb-3">

          <div className="border-t border-1 border-gray-200 flex-grow"></div>

          <div className="text-gray-600 text-sm font-light pr-6 pl-6 ">QR enter the code manually</div>



          <div className="border-t border-1 border-gray-200 flex-grow"></div>



        </div>

        <div className="mb-6">
          <input type="text" />

        </div>

      </div>

    </div>
  );
};

export default TwoFaSetup;
