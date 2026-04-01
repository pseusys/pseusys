import { getWork, getEducation, getEvents } from '@/lib/data';
import { mdToHtml } from '@/lib/markdown';

export default function Experience() {
  const work = getWork().filter(item => item.profiles.includes('research'));
  const education = getEducation().filter(item => !item.profiles.includes('none'));
  const events = getEvents().filter(item => !item.profiles.includes('none'));

  return (
    <div className="max-w-2xl space-y-10">

      <section>
        <h1 className="text-2xl font-bold">Work Experience</h1>
        <div className="mt-6 space-y-6">
          {work.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline gap-4">
                <span className="font-semibold">{item.job}</span>
                <span className="text-sm text-gray-500 shrink-0">{item.start} – {item.end}</span>
              </div>
              <div className="text-sm text-gray-600 mb-1">{item.place}</div>
              <div
                className="text-gray-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: mdToHtml(item.resp) }}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Education</h2>
        <div className="mt-6 space-y-6">
          {education.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline gap-4">
                <span className="font-semibold">{item.title}</span>
                <span className="text-sm text-gray-500 shrink-0">{item.start} – {item.end}</span>
              </div>
              <div className="text-sm text-gray-600 mb-1">{item.place}</div>
              <div
                className="text-gray-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: mdToHtml(item.result) }}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Events & Recognitions</h2>
        <div className="mt-6 space-y-4">
          {events.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline gap-4">
                <span className="font-semibold">{item.name}</span>
                <span className="text-sm text-gray-500 shrink-0">{item.date}</span>
              </div>
              <div
                className="text-gray-700 text-sm leading-relaxed mt-1"
                dangerouslySetInnerHTML={{ __html: mdToHtml(item.description) }}
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
