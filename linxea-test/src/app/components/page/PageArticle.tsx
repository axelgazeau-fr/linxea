"use client"
import PageHeader from "@/app/components/ui/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation'
import TagArticle from "../ui/tagArticle";

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

export default function Article() {
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
    <div>
      {isLoading && <p>Chargement ...</p>}
      {!isLoading &&
        <div className="max-w-[80vw] mx-auto bg-white mt-5 flex flex-col items-center">
          <PageHeader title={data?.title ?? null}/>
          <div>
            <div className="aspect-[20/11]">
              <img className="w-full object-cover rounded-xl" src="https://picsum.photos/600/300" alt={data?.title}/>
            </div>
            <p className="text-blue pt-2">{data?.price && data?.price > 0 ? <strong className="mt-2 block">À partir de {data.price}€/mois</strong> : <strong className="mt-2 block">Sans frais</strong>}</p>
            <p className="text-blue my-5">{data?.description}</p>

            <div className="align-left text-left gap-2">
              <h4 className="mb-2">Catégories :</h4>
              <div className="flex flex-wrap gap-2">
                {data?.tags.map(tag => (
                  <TagArticle key={tag} text={tag} />
                ))}
              </div>
            </div>

            <div className="bg-gray-200 w-full text-right p-5 my-5">
              <small className="text-blue">{data ? new Date(data.updatedAt).toLocaleDateString() : ""}</small>
            </div>
          </div>
      </div>
      }
    </div>
  );
}
