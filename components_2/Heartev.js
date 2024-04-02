"use client";
import { db } from "@/app/firebase/config";
import {
  updateDoc,
  increment,
  getDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Hearte({ post }) {
  const [postRef, setPostRef] = useState(null);
  const [heartCount, setHeartCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const eventCollections = [
        collection(db, "Event"),
        collection(db, "Event A"),
      ];
      for (const eventsCollection of eventCollections) {
        const q = query(eventsCollection, where("slug", "==", post.slug));
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
      <button onClick={addHeart} className="transparent-background-button">
        💗 {heartCount}
      </button>
    </div>
  );
}
