import HomePage from "@/components/HomePage/HomePage";
import RetrieveBalance from "@/components/HomePage/RetrieveBalance";

export default function page() {
  return (
    <div>
      <RetrieveBalance />
      <HomePage />
    </div>
  );
}
