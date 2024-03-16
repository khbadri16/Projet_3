import { auth } from "@/app/firebase/config";
import Link from "next/link";

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = ((wordCount || 0) / 100 + 1).toFixed(0);
  let ifyes = null;
  if (auth.currentUser) {
    if (post.uid === auth.currentUser.uid) {
      ifyes = true;
    }
  }
  return (
    <div className="card">
      <div className="card-content">
        <img
          src={post.img}
          width="300"
          height="100"
          alt="Description of the image"
          className="post-img"
        />
        <div className="post-details">
          <Link href={`/${post.username}`}>
            <strong>By @{post.username}</strong>
          </Link>

          <Link href={`/${post.username}/${post.slug}`}>
            <h2>{post.title}</h2>
          </Link>

          <footer>
            <span>
              {wordCount} words. {minutesToRead} min read
            </span>
            <span className="push-left">💗 {post.heartCount || 0} Hearts</span>
            <span className="">👁️ {post.ViewCount || 0} Views</span>
          </footer>
        </div>
      </div>

      {ifyes && (
        <Link href={`/admin/${post.slug}`}>
          <div className="edit-icon">
            <img src="/edit.svg" alt="Edit Logo" width="30" height="30" />
          </div>
        </Link>
      )}
    </div>
  );
}
