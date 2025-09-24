"use client";

import { useQuery } from "@tanstack/react-query";
import CardArticle from "../ui/CardArticle";
import { useState } from "react";
import PageHeader from "../ui/PageHeader";

type Post = {
  id: string ,
  slug: string ,
  title: string ,
  description: string ,
  price: number ,
  imageUrl: string ,
  tags: string[],
  updatedAt: string ,
};

export default function Articles() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://domco-vite-api-starter-sigma.vercel.app/products");
      if (!res.ok) throw new Error("Erreur lors du fetch");
      return res.json();
    },
  });

  if (error) return <p>Une erreur est survenue</p>;
  const allTags = Array.from(new Set(data?.flatMap((p) => p.tags) ?? []));
  let filteredPosts = selectedTag
    ? data?.filter((post) => post.tags.includes(selectedTag))
    : data;

  filteredPosts = filteredPosts?.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <>
      <PageHeader title={"Nos assurances"}/>
      {isLoading && <p>Chargement</p>}
      {!isLoading &&
        <section>
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {allTags?.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`cursor-pointer px-3 py-1 rounded ${
                  selectedTag === tag
                    ? "bg-blue text-white"
                    : "bg-gray-200 text-blue"
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTag &&
              <button
                onClick={() => setSelectedTag(null)}
                className="cursor-pointer px-3 py-1 rounded bg-orange text-white"
              >
                X
              </button>
            }
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[85vw] mx-auto mb-10">
            {filteredPosts?.map((post) => (
              <CardArticle
                key={post.id}
                title={post.title}
                description={post.description}
                link={post.slug}
                price={post.price}
                tags={post.tags}
                date={post.updatedAt}
                selectedTag={selectedTag}
              />
            ))}
            </div>
        </section>
      }
    </>
  );
}
