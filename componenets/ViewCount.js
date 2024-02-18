"use client";
import { db } from "@/app/firebase/config";
import {
  updateDoc,
  increment,
  getDoc,
  collectionGroup,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Views({ slug }) {
  const [postRef, setPostRef] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const postsCollection = collectionGroup(db, "posts");
      const q = query(postsCollection, where("slug", "==", slug));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const postDoc = querySnapshot.docs[0];
        const documentReference = postDoc.ref;
        setPostRef(documentReference);
      }
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    const updateViewCount = async () => {
      if (postRef) {
        try {
          const postDoc = await getDoc(postRef);
          if (postDoc.exists()) {
            await updateDoc(postRef, { ViewCount: increment(1) });
            console.log("Views added successfully");
          } else {
            console.error("Post document does not exist");
          }
        } catch (error) {
          console.error("Error updating view count:", error);
        }
      }
    };

    updateViewCount();
  }, [postRef]);

  return null;
}
