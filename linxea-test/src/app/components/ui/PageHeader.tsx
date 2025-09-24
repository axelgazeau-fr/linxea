type PageheaderProps = {
  title: string | null;
};

export default function Pageheader({title}: PageheaderProps) {
  return (
  <div className="max-w-[85vw] px-4 py-5 sm:px-6 lg:px-8 lg:py-10 mx-auto">
    <div className="mx-auto text-center mb-5 lg:mb-8">
      <h1 className="text-2xl font-bold md:text-4xl md:leading-tight text-blue">{title}</h1>
    </div>
  </div>
  )

}