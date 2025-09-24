import Link from "next/link";

type CardArticleProps = {
  title: string;
  description: string;
  link: string;
  price: number;
  tags: string[];
  date: string
};

export default function CardArticle({title, description, link, price, tags, date}: CardArticleProps) {
  const cleanDate = new Date(date);
  return (
    <Link className="bg-white group flex flex-col justify-around h-full border border-2 border-blue hover:border-orange hover:shadow-lg focus:outline-hidden focus:border-orange focus:shadow-lg transition duration-300 rounded-xl p-5" href={`/articles/${link}`}>
      <div className="aspect-w-16 aspect-h-11">
        <img className="w-full object-cover rounded-xl" src="https://picsum.photos/400/200" alt="Blog Image"/>
      </div>
      <div className="my-6">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h2 className="text-blue text-xl font-semibold mt-2">
          {title}
        </h2>
        <p className="text-blue mt-2">
          {description}
         {price > 0 ? <strong className="mt-2 block">{price} €</strong> : <strong className="mt-2 block">Sans frais</strong>}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-orange">
          {cleanDate.toLocaleDateString("fr-FR")}
        </p>
      </div>
    </Link>
  )
}
