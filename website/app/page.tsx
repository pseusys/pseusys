export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Aleksandr Sergeev</h1>
      <p className="text-lg text-gray-600 mt-1">R&D Engineer | MSc in Informatics</p>
      <p className="mt-4 text-gray-700 max-w-2xl">
        Software engineer and researcher with interests in network protocol design,
        distributed systems, and applied cryptography.
      </p>
      <div className="mt-6 flex gap-4 text-sm">
        <a href="https://github.com/pseusys" className="text-blue-600 hover:underline">GitHub</a>
        <a href="https://www.linkedin.com/in/pseusys/" className="text-blue-600 hover:underline">LinkedIn</a>
        <a href="https://t.me/pseusys" className="text-blue-600 hover:underline">Telegram</a>
        <a href="https://pseusys.hashnode.dev/" className="text-blue-600 hover:underline">Blog</a>
      </div>
    </div>
  );
}
