"use client";

import { useQuery } from "@tanstack/react-query";

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
    <ul>
      {!isLoading && data?.map((post) => (
        <li key={post.id}>{post.slug}</li>
      ))}
    </ul>
  );
}
