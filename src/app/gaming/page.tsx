import { ClipGallery } from "@/components/clips/clip-gallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gaming | gpburton",
  description: "Take a look at these moments I had while gaming.",
};

export default function Home() {
  return (
    <main className="container mt-5 mb-20 flex flex-col gap-14">
      <div>
        <h1 className="text-4xl mb-2">Gaming</h1>
        <p>
          Take a look at some of the gaming moments I found worth capturing.
        </p>
      </div>
      <div>
        <h2 className="text-2xl mb-5">Medal Clips</h2>
        <ClipGallery />
      </div>
    </main>
  );
}
