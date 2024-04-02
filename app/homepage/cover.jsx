import React from "react";

const CoverWithText = () => {
  return (
    <div className="containe">
      <div className="content">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          CPF CANCER PATIENTS
          <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            FRIENDS
          </mark>{" "}
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Ensemble nous sommes plus forts...
        </p>
      </div>

      <img className="imagee" src="/coverture.JPG" alt="" />
    </div>
  );
};

export default CoverWithText;
