import { getContact } from '@/lib/data';

export default function Home() {
  const contact = getContact();

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">{contact.name}</h1>
      <p className="text-lg text-gray-600 mt-1">{contact.title}</p>

      <p className="mt-4 text-gray-700 leading-relaxed">
        I am a software engineer and researcher with a background in networked systems, applied
        cryptography, and distributed computing. I hold a Master&apos;s degree from Grenoble INP –
        Ensimag and a Bachelor&apos;s from St. Petersburg Electrotechnical University, with an exchange
        semester at HKUST.
      </p>
      <p className="mt-3 text-gray-700 leading-relaxed">
        Currently, I work as an R&D engineer at Synopsys, where I built a schema-driven code
        generation system for the DPF simulation framework. My research interests center on
        privacy-preserving network protocols — in particular, designing systems where encrypted
        traffic is indistinguishable from generic background noise.
      </p>
      <p className="mt-3 text-gray-700 leading-relaxed">
        I am actively looking for PhD positions in network security and privacy.
      </p>
      <p className="mt-3 text-gray-700 leading-relaxed">
        Outside of work, I enjoy applying cryptography and machine learning to personal projects,
        travelling whenever I get the chance, and writing short stories — in Russian, which keeps
        the audience conveniently small.
      </p>
      <p className="mt-3 text-gray-700 leading-relaxed">
        Looking ahead, I hope to grow into research and, eventually, teaching — sharing ideas
        is half the fun of having them. On the literary side, I am working towards translating
        my stories and getting them published, so the audience may grow after all.
      </p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <a href={contact.github} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={contact.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={contact.telegram} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Telegram</a>
        <a href={contact.blog} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Blog</a>
        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">Email</a>
      </div>
    </div>
  );
}
