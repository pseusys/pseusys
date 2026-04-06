import { getContact } from '@/lib/data';

export default function Home() {
  const contact = getContact();

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">{contact.name}</h1>
      <p className="text-lg text-gray-600 mt-1">{contact.title}</p>

      <p className="mt-4 text-gray-700 leading-relaxed">
        I write code that misbehaves — on purpose, carefully, and with documented test cases.
      </p>
      <p className="mt-3 text-gray-700 leading-relaxed">
        R&D engineer at Synopsys by day. Protocol designer by night. I build things that make simulation
        data go fast, network traffic go dark, and communication systems stay private in adversarial
        conditions.
      </p>
      <p className="mt-3 text-gray-700 leading-relaxed">
        Currently obsessed with: making encrypted traffic look like generic noise, schema-driven
        multi-language code generation, and the surprisingly large overlap between compiler
        design and protocol specification.
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
