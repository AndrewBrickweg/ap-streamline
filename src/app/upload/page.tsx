"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    console.log("button clicked");
    if (!file) return;

    setIsUploading(true);
    setMessage("Uploading...");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await res.json();
      console.log("File uploaded successfully:", data);
      setMessage("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file");
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/">
        <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
          Go to Home
        </button>
      </Link>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="file-input file-input-bordered"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 roundedbg-blue-500 text-white px-4 py-2 rounded cursor-pointer active:bg-blue-400"
        disabled={!file || isUploading}
      >
        {isUploading ? "Uploading..." : "Upload Invoice"}
      </button>

      {message && <div className="mt-4 text-green-500">{message}</div>}
    </main>
  );
}
