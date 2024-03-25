"use client";

import useUserdata from "@/lib/hooks";
import {
  Timestamp,
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
import Addbutton from "@/components_3/addButton";
import AuthCheck from "@/componenets/Authcheck";
import Filtercat from "@/components_3/filter";
import Navbar2 from "@/components_3/Navbar1.2";
import ArticleComponent from "@/components_4/addArticle";
import Loading from "@/components_4/Loadin";

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
    if (loading) return;
    setLoading(true);

    try {
      const last = posts[posts.length - 1];
      if (!last) {
        console.error("No last post found");
        setPostsEnd(true); // Set postsEnd to true if no last post is found
        setLoading(false);
        return;
      }

      const cursor = new Timestamp(
        Math.floor(last.createdAt / 1000),
        (last.createdAt % 1000) * 1000000
      );
      console.log("Cursor:", cursor);

      const postCollection = collectionGroup(db, "posts");
      const q = query(
        postCollection,
        orderBy("createdAt", "desc"),
        startAfter(cursor),
        limit(5)
      );

      const querySnapshot = await getDocs(q);
      const newPosts = querySnapshot.docs.map((doc) => doc.data());

      console.log("New Posts:", newPosts);

      if (newPosts.length === 0) {
        setPostsEnd(true); // Set postsEnd to true if no new posts are fetched
      } else {
        setPosts(posts.concat(newPosts));
      }
      setLoading(false);
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
        <Filtercat />
        <AuthCheck>
          <ArticleComponent />
        </AuthCheck>
      </UserContext.Provider>

      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </>
  );
}
