'use client';

import Link from "next/link";
import { Post } from "@/dbschema/interfaces";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";

export default function PostsList({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = (await fetch("/api/posts")).json();
      return res;
    }

    fetchPosts().then(
      (data) => {
        setPosts(data.posts);
      }
    );
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts?query=${query}`);
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    debouncedSearch(newValue);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Blog</h2>
          <p className="mt-2 text-lg/8 text-gray-600">Learn the latest about science, technology, and culture.</p>
          <form className="w-full mx-auto mt-6" onSubmit={e => {
            e.preventDefault();
            debouncedSearch(search);
          }}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                value={search}
                onChange={handleSearchChange}
                id="default-search"
                name="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border-b border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search through posts..."
              />
              {loading && (
                <div className="absolute right-10 bottom-4">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              )}
            </div>
          </form>
          <div className="space-y-16 border-t border-gray-200 mt-4 sm:mt-8 pt-4 sm:pt-8">
            {posts.length === 0 && (
              <div className="text-gray-600 text-center">
                No posts found.
              </div>
            )}
            {posts.length > 0 && posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={(new Date(post.created!)).toDateString()} className="text-gray-500">
                    {(new Date(post.created!)).toDateString()}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <Link href={`/${post.id}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.content}</p>
                </div>
                <div className="relative mt-2 flex items-center gap-x-4">
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                      {post.author}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
