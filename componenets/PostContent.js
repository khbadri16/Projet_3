"use client";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Views from "./ViewCount";

export default function PostContent({ post }) {
  const createdAt = new Date(post.createdAt);

  return (
    <div className="cardd">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{" "}
        <Link href={`/${post.username}/`}>
          <div className="text-info">@{post.username}</div>
        </Link>{" "}
        <Link href={`/category/${post.category}/`}>
          <div className="custom-tag">
            <p>{post.category}</p>
          </div>
        </Link>
        <div> on {createdAt.toISOString()}</div>
      </span>
      <div>
        <img className="spaced-image" src={post.picture} />
      </div>

      <ReactMarkdown>{post?.content}</ReactMarkdown>
      <Views slug={post.slug} />
    </div>
  );
}
