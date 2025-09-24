"use client";

import { useQuery } from "@tanstack/react-query";
import CardArticle from "../components/CardArticle";

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
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://domco-vite-api-starter-sigma.vercel.app/products");
      if (!res.ok) throw new Error("Erreur lors du fetch");
      return res.json();
    },
  });

  if (error) return <p>Une erreur est survenue</p>;

  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h1 className="text-2xl font-bold md:text-4xl md:leading-tight text-blue">Nos assurances</h1>
        </div>
      </div>
      <div  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[85rem] mx-auto mb-10">
        {!isLoading && data?.map((post) => (
          <CardArticle
            key={post.id}
            title={post.title}
            description={post.description}
            link={post.slug}
            price={post.price}
            tags={post.tags}
            date={post.updatedAt}
          />
        ))}
      </div>
    </>
  );
}
