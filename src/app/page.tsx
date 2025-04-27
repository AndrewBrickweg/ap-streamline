import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-6">Welcome to the File Uploader</h1>
      <p className="text-lg mb-8 text-gray-600">
        Easily upload and manage your files.
      </p>

      <Link href="/upload">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
          Go to Upload Page
        </button>
      </Link>
    </main>
  );
}
