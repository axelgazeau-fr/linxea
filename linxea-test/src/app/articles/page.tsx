import type { Metadata } from "next";
import Articles from "../components/page/PageArticlesList";

export const metadata: Metadata = {
  title: "Nos assurances",
  description: "La description de la page principale",
};
export default function Page() {
  return <Articles />;
}