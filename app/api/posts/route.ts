import { type NextRequest } from 'next/server'
import { client } from '@/edgedb'
import e from "@/dbschema/edgeql-js"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  const postsQuery = e.select(e.Post, () => ({
    id: true,
    title: true,
    content: true,
    author: true,
    created: true,
  }));
  let posts = await postsQuery.run(client);

  if (!query) {
    return Response.json({
      posts
    })
  }

  const searchQueryEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query as string,
  });

  const embeddings = searchQueryEmbedding.data[0].embedding;

  const searchResult = (await client.query<{ object: { id: string }, distance: number }>(`
    with query := <array<float32>><json>$query
    select ext::ai::search(Post, query);
  `, {
    query: embeddings,
  }));

  const closestPosts = searchResult.filter(post => post.distance < 0.8)

  return Response.json({
    posts: posts.filter(post => closestPosts.some(closest => closest.object.id === post.id))
  })
}