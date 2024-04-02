"use client";
import { useState } from "react";
import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "@/app/firebase/config";
import { MdEmail } from "react-icons/md";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSendResetEmail = async () => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length === 0) {
        toast.error("Invalid email address. Please enter a valid email.");
        return;
      }

      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      setShowModal(false);
    } catch (error) {
      console.error("Error sending reset email:", error.message);
      toast.error("Error sending reset email");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="text-blue-600 hover:underline focus:outline-none bg-transparent"
      >
        Forgot Your Password?
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-lg shadow-xl w-full sm:w-96">
            <span
              className="absolute top-0 right-0 m-4 cursor-pointer text-gray-500"
              onClick={handleCancel}
            >
              &times;
            </span>
            <h2 className="text-blue-600 text-2xl font-bold mb-5">
              Enter your email to reset your password
            </h2>
            <div className="relative mb-4">
              <MdEmail className="absolute left-3 top-4 text-blue-600" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-10 bg-gray-300 rounded outline-none text-black "
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSendResetEmail}
                className="w-full mr-2 p-3 bg-blue-600 rounded text-white hover:bg-blue-500"
              >
                Send Email
              </button>
              <button
                onClick={handleCancel}
                className="w-full ml-2 p-3 bg-gray-400 rounded text-gray-900 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PasswordReset;
