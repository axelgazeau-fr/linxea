import Article from "@/app/components/page/PageArticle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre article",
  description: "La page article",
};
export default function Page() {
  return <Article />;
}