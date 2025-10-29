import ContactForm from "@/app/components/ContactForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <main className="w-full max-w-2xl bg-gray-50 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Form Demo</h1>
        <ContactForm />
      </main >
    </div >
  );
}
