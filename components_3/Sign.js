"use client";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { PiUserCirclePlusDuotone } from "react-icons/pi";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  where,
  query,
  getDocs,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { IoMdPhotos } from "react-icons/io";

const SignUpp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [profilePicture, setProfilePicture] = useState(null);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const usernameExists = await checkUsernameExists(username);

      if (usernameExists) {
        console.error(
          "Username is already taken. Please choose a different username."
        );
        toast.error("the username alredy exist");
        return;
      }

      const res = await createUserWithEmailAndPassword(email, password);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const user = res.user;

      const userRef = doc(db, "users", user.uid);

      await setDoc(userRef, {
        uid: user.uid,
        username: username,
        photoURL: profilePicture ? await uploadProfilePicture() : null,
      });

      console.log({ res });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
      setUsername("");
      toast.success("User create secsusfully");
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const checkUsernameExists = async (usernameToCheck) => {
    const q = query(
      collection(db, "users"),
      where("username", "==", usernameToCheck)
    );
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  };

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const uploadProfilePicture = async () => {
    try {
      const storageRef = ref(storage, `userImages/${profilePicture.name}`);
      await uploadBytes(storageRef, profilePicture);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
      return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-green-600 text-2xl mb-5">
          <PiUserCirclePlusDuotone className="inline-block mr-2" /> Sign Up
        </h1>
        <div className="relative mb-4">
          <MdEmail className="absolute left-3 top-3 text-green-600" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-10 bg-white rounded outline-none text-gray-800 placeholder-gray-500 border border-green-600"
          />
        </div>
        <div className="relative mb-4">
          <RiLockPasswordFill className="absolute left-3 top-3 text-green-600" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-10 bg-white rounded outline-none text-gray-800 placeholder-gray-500 border border-green-600"
          />
        </div>
        <div className="relative mb-4">
          <FaUser className="absolute left-3 top-3 text-green-600" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 pl-10 bg-white rounded outline-none text-gray-800 placeholder-gray-500 border border-green-600"
          />
        </div>

        <div className="relative mb-4">
          <IoMdPhotos className="absolute left-3 top-1 text-green-600" />
          <label
            htmlFor="profilePicture"
            className="w-full p-3 bg-white rounded cursor-pointer text-green-600 pl-10 border border-green-600"
          >
            {profilePicture
              ? `Selected: ${profilePicture.name}`
              : "Add Profile Picture"}
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handlePictureUpload}
            className="hidden"
          />
        </div>
        <div className="mb-4"></div>
        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-green-600 rounded text-white hover:bg-green-900"
        >
          Add Member
        </button>
      </div>
    </div>
  );
};

export default SignUpp;
