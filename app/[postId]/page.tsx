import { client } from "@/edgedb";
import e from "@/dbschema/edgeql-js";
import Link from "next/link";

interface PageParams {
  postId: string;
}

export default async function Page({ params }: { params: PageParams }) {
  const postId = params.postId;
  const postQuery = e.select(e.Post, () => ({
    id: true,
    title: true,
    content: true,
    author: true,
    created: true,
    filter_single: {
      id: postId,
    }
  }));
  const post = await postQuery.run(client);

  if (!post) {
    return (
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Post not found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* back button */}
          <Link href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-gray-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          </Link>
          <h2 className="text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:text-4xl mt-10">{post.title}</h2>
          <p className="mt-2 text-lg/8 text-gray-600">{post.author}</p>
          <div className="flex items-center gap-x-4 text-xs">
            <time dateTime={post.created?.toDateString()} className="text-gray-500">
              {post.created?.toDateString()}
            </time>
          </div>
          <div className="mt-10 space-y-16 border-t border-gray-200">
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="group relative">
                <p className="mt-5 text-sm/6 text-gray-600">{post.content}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div >
  )
}
