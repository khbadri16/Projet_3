"use client";

import useUserdata from "@/lib/hooks";
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, postToJSON } from "../firebase/config";
import { UserContext } from "@/lib/context";
import PostFeed from "@/componenets/postUser";
import Loader from "@/componenets/loader";
import Navbar1 from "@/componenets/NavBar1.1";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const userData = useUserdata();

  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const postCollection = collectionGroup(db, "posts");
      const q = query(postCollection, orderBy("createdAt", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      const postsliste = querySnapshot.docs.map(postToJSON);
      setPosts(postsliste);
    }

    fetchPosts();
  }, []);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = last.createdAt;

    const postCollection = collectionGroup(db, "posts");
    const q = query(
      postCollection,
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(5)
    );

    try {
      const querySnapshot = await getDocs(q);
      const newPosts = querySnapshot.docs.map((doc) => doc.data());

      setPosts(posts.concat(newPosts));
      setLoading(false);

      if (newPosts.length < 5) {
        setPostsEnd(true);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <UserContext.Provider value={userData}>
        <Navbar1 />
      </UserContext.Provider>
      <div className="mt-16" />
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </>
  );
}
