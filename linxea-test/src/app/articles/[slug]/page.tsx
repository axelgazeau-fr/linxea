"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation'

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
  const params = useParams<{ slug: string }>()
  const { data, isLoading, error } = useQuery<Post>({
    queryKey: ["post", params.slug],
    queryFn: async () => {
      const res = await fetch(`https://domco-vite-api-starter-sigma.vercel.app/products/${params.slug}`);
      if (!res.ok) throw new Error("Erreur lors du fetch");
      return res.json();
    },
  });

  if (error) return <p>Une erreur est survenue</p>;

  return (
  <div className="p-4 border rounded text-blue">
    <h1 className="text-xl font-bold">{data?.title}</h1>
    <p>{data?.description}</p>
    <p>Prix: {data?.price} €</p>
    <img src={data?.imageUrl} alt={data?.title} className="w-48 h-48 object-cover" />
    <div>
      {data?.tags.map(tag => (
        <span key={tag} className="mr-2 px-2 py-1 bg-gray-200 rounded">{tag}</span>
      ))}
    </div>
    <small>Dernière maj: {data ? new Date(data.updatedAt).toLocaleDateString() : ""}</small>
  </div>
  );
}
