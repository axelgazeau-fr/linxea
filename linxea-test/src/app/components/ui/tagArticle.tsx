type tagdArticleProps = {
  text: string;
  selected?: boolean
};

export default function tagdArticle({text, selected}: tagdArticleProps) {
  return (
    <span className={`cursor-pointer px-3 py-1 rounded ${selected? "bg-blue text-white": "bg-gray-200 text-blue"}`}>
      {text}
    </span>
  )
}