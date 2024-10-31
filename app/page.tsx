import PostsList from "@/components/PostsList";
import e from "@/dbschema/edgeql-js";
import { client } from "@/edgedb";

export default async function Page() {
  const postsQuery = e.select(e.Post, () => ({
    id: true,
    title: true,
    content: true,
    author: true,
    created: true,
  }));
  let posts = await postsQuery.run(client);

  return <PostsList initialPosts={posts} />;
}
