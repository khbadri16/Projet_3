import React from "react";
import { auth, db } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

export default function useUserdata() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setUsername(docSnapshot.data()?.username);
        } else {
          setUsername(null);
        }
      });
    } else {
      setUsername(null);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, setUsername]);
  return { user, username };
}
