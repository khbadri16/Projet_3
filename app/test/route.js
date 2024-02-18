import { db } from "../firebase/config";
import { getDocs } from "firebase/firestore";
import { collectionGroup } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request) {
  const res = collectionGroup(db, "posts");
  const posts = await getDocs(res);

  console.log(posts);

  return NextResponse.json(posts);
}
