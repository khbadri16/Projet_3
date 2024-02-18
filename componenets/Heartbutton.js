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
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Heart({ post }) {
  const [postRef, setPostRef] = useState(null);
  const [heartCount, setHeartCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const postsCollection = collectionGroup(db, "posts");
      const q = query(postsCollection, where("slug", "==", post.slug));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const postDoc = querySnapshot.docs[0];
        const documentReference = postDoc.ref;
        setPostRef(documentReference);

        const unsubscribe = onSnapshot(documentReference, (snapshot) => {
          if (snapshot.exists()) {
            setHeartCount(snapshot.data().heartCount || 0);
          }
        });

        return () => unsubscribe();
      }
    };

    fetchData();
  }, [post.slug]);

  const addHeart = async () => {
    try {
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        await updateDoc(postRef, { heartCount: increment(1) });
        console.log("Heart added successfully");
      } else {
        console.error("Post document does not exist");
      }
    } catch (error) {
      console.error("Error adding heart", error);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button onClick={addHeart}>💗 Heart</button>
      <p
        style={{
          marginLeft: "8px",
          fontWeight: "bold",
          color: "black",
        }}
      >
        {heartCount} 🤍
      </p>
    </div>
  );
}
