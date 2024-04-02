"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiLoginBoxLine } from "react-icons/ri";
import PasswordReset from "@/components_5/forgetpassword";
import toast from "react-hot-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (!res || !res.user) {
        toast.error("Invalid email or password.");
        return;
      }

      console.log({ res });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("An error occurred during sign-in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full sm:w-96">
        <h1 className="text-blue-600 text-2xl font-bold mb-5">
          <RiLoginBoxLine className="inline-block mr-2" />
          Sign In
        </h1>
        <div className="relative mb-4">
          <MdEmail className="absolute left-3 top-4 text-blue-600" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-300 rounded outline-none text-black placeholder-gray-500"
          />
        </div>
        <div className="relative mb-4">
          <RiLockPasswordFill className="absolute left-3 top-4 text-blue-600" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-300 rounded outline-none text-black placeholder-gray-500"
          />
        </div>
        <div className="relative mt-[-25px] mb-3 pl-7">
          <PasswordReset />
        </div>
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-blue-600 rounded text-white hover:bg-blue-500"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
