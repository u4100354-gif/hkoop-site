import type { Metadata } from "next";
import SearchClient from "../../components/SearchClient";

export const metadata: Metadata = {
  title: "Поиск — ХКООП",
  description: "Поиск по новостям, документам и разделам сайта ХКООП.",
};

export default function SearchPage() {
  return <SearchClient />;
}
