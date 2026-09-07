import { getProjects } from '@/lib/data';
import { mdToHtml } from '@/lib/markdown';

export default function Projects() {
  const items = getProjects().filter(p => !p.profiles.includes('none'));

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Projects</h1>

      <div className="mt-6 space-y-6">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between items-baseline gap-4">
              <a href={item.link} className="font-semibold text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
              <span className="text-sm text-gray-500 shrink-0">{item.start} – {item.end}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">{item.tools}</div>
            <div
              className="text-gray-700 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: mdToHtml(item.desc) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
