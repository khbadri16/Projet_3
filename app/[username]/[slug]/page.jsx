import { db, getUserWithUsername, postToJSON } from "@/app/firebase/config";
import Heart from "@/componenets/Heartbutton";
import PostContent from "@/componenets/PostContent";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

export const revalidate = 100;
export const dynamic = "force-static";

export async function getStaticParams() {
  const postsRef = collection(db, "posts");
  const postsQuerySnapshot = await getDocs(postsRef);

  return postsQuerySnapshot.docs.map((doc) => {
    const post = doc.data();
    return {
      params: {
        username: post.username,
        slug: post.slug,
      },
    };
  });
}

export default async function getparams({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  const postsRef = collection(userDoc.ref, "posts");
  const postDoc = doc(postsRef, slug);

  let post = null;

  const postSnapshot = await getDoc(postDoc);

  if (postSnapshot.exists()) {
    post = postToJSON(postSnapshot);
  }

  return (
    <main>
      <section>
        <PostContent post={post} />
      </section>
      <aside className="card">
        <Heart post={post} />
      </aside>
    </main>
  );
}
