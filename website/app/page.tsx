import { getContact, getResearch } from '@/lib/data';

export default function Home() {
  const contact = getContact();
  const { statements } = getResearch();
  const intro = statements.find(s => s.profiles.includes('research'));

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">{contact.name}</h1>
      <p className="text-lg text-gray-600 mt-1">{contact.title.replace(/\\&/g, '&')}</p>

      {intro && (
        <p className="mt-4 text-gray-700 leading-relaxed">{intro.text}</p>
      )}

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
