import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | gpburton",
  description: "Send me a message if you would like to learn more about me.",
};

export default function Home() {
  return (
    <main className="container mt-5 mb-20 flex flex-col gap-14">
      <h1 className="text-4xl">Contact</h1>
      <div>
        <p>Contact form...</p>
        {/* <ContactForm /> */}
      </div>
    </main>
  );
}
