"use client";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />

        <label
          htmlFor="profilePicture"
          className="w-full p-3 mb-4 bg-gray-700 rounded cursor-pointer text-white"
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
        <div className="mb-4"></div>
        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUpp;
