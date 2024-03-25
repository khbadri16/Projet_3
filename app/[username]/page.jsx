import UserProfile from "@/componenets/Userprofile";
import { getUserWithUsername, postToJSON } from "../firebase/config";
import PostFeed from "@/componenets/postUser";
import { orderBy, limit, getDocs, query } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { UserContext } from "@/lib/context";
import useUserdata from "@/lib/hooks";

async function fetchData(username) {
  const userDoc = await getUserWithUsername(username);

  if (userDoc) {
    const user = userDoc.data();
    const postsRef = collection(userDoc.ref, "posts");
    const postsQuerySnapshot = await getDocs(
      query(postsRef, orderBy("createdAt", "desc"), limit(5))
    );

    const postList = postsQuerySnapshot.docs.map(postToJSON);
    return { user, postList };
  } else {
    return { user: null, postList: [] };
  }
}

export default async function page({ params }) {
  const { username } = params;

  const { user, postList } = await fetchData(username);

  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={postList} />
    </main>
  );
}
