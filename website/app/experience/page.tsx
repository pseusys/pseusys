import { getWork, getEducation, getEvents, getTeaching, getSkills, getLanguages, getCertifications } from '@/lib/data';
import { mdToHtml } from '@/lib/markdown';

export default function Experience() {
  const work = getWork().filter(item => item.profiles.includes('research'));
  const education = getEducation().filter(item => !item.profiles.includes('none'));
  const events = getEvents().filter(item => !item.profiles.includes('none'));
  const teaching = getTeaching().filter(item => !item.profiles.includes('none'));
  const skills = getSkills().filter(item => !item.profiles.includes('none'));
  const languages = getLanguages().filter(item => !item.profiles.includes('none'));
  const certifications = getCertifications().filter(item => !item.profiles.includes('none'));

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

      {teaching.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold">Teaching</h2>
          <div className="mt-6 space-y-6">
            {teaching.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-semibold">{item.role}</span>
                  <span className="text-sm text-gray-500 shrink-0">{item.start} – {item.end}</span>
                </div>
                <div className="text-sm text-gray-600 mb-1">{item.place}</div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold">Skills</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          {skills.map((item, i) => (
            <div key={i} className="flex justify-between items-baseline gap-4">
              <span className="text-gray-700 text-sm">{item.name}</span>
              <span className="text-xs text-gray-400 shrink-0">{item.years}y</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Languages</h2>
        <div className="mt-6 space-y-1">
          {languages.map((item, i) => (
            <div key={i} className="flex justify-between items-baseline gap-4">
              <span className="font-semibold text-sm">{item.name}</span>
              <span className="text-sm text-gray-600">{item.level}</span>
            </div>
          ))}
        </div>
      </section>

      {certifications.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold">Certifications</h2>
          <div className="mt-6 space-y-3">
            {certifications.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-semibold text-sm">{item.name}</span>
                  <span className="text-sm text-gray-500 shrink-0">{item.result}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
