import HomePage from "@/components/HomePage/HomePage";
import RetrieveBalance from "@/components/HomePage/RetrieveBalance";
import PhotoDetail from "@/components/PhotoDetail";

export default function page() {
  return (
    <div>
      {/* <PhotoDetail /> */}
      <HomePage />
      <RetrieveBalance/>
    </div>
  );
}
