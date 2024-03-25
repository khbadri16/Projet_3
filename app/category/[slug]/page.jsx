"use client";
import useUserdata from "@/lib/hooks";
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserContext } from "@/lib/context";
import PostFeed from "@/componenets/postUser";
import Loader from "@/componenets/loader";
import { db, postToJSON } from "@/app/firebase/config";
import Filtercat from "@/components_3/filter";
import Navbar2 from "@/components_3/Navbar1.2";
import Loading from "@/components_4/Loadin";

export default function Postbycat({ params }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const [posts, setPosts] = useState(null);
  const userData = useUserdata();

  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const postCollection = collectionGroup(db, "posts");
      const q = query(
        postCollection,
        orderBy("createdAt", "desc"),
        where("category", "==", decodedSlug),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const postsliste = querySnapshot.docs.map(postToJSON);
      setPosts(postsliste);
    }

    fetchPosts();
  }, [decodedSlug]);

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

  if (!posts) {
    return <Loading />;
  }

  return (
    <>
      <UserContext.Provider value={userData}>
        <Navbar2 />
      </UserContext.Provider>
      <Filtercat />
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
