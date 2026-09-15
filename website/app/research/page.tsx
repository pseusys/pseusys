import { getResearch, getPublications } from '@/lib/data';

export default function Research() {
  const { statements, keywords } = getResearch();
  const { items: papers, reports, theses } = getPublications();

  const visibleStatements = statements.filter(s => s.profiles.includes('research'));
  const visibleKeywords = keywords.filter(k => k.profiles.includes('research'));
  const visiblePapers = papers.filter(p => !p.profiles.includes('none'));
  const visibleReports = reports.filter(r => !r.profiles.includes('none'));
  const visibleTheses = theses.filter(t => !t.profiles.includes('none'));

  return (
    <div className="max-w-2xl space-y-10">

      <section>
        <h1 className="text-2xl font-bold">Research Interests</h1>
        <div className="mt-6 space-y-4">
          {visibleStatements.map((s, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">{s.text}</p>
          ))}
        </div>
        {visibleKeywords.length > 0 && (
          <p className="mt-4 text-sm text-gray-600">
            <span className="font-semibold">Keywords: </span>
            {visibleKeywords[0].text}
          </p>
        )}
      </section>

      {visiblePapers.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold">Papers</h2>
          <div className="mt-6 space-y-5">
            {visiblePapers.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline gap-4">
                  {p.link
                    ? <a href={p.link} className="font-semibold text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{p.title}</a>
                    : <span className="font-semibold">{p.title}</span>
                  }
                  <span className="text-sm text-gray-500 shrink-0">{p.year}</span>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {p.authors.join(', ')}
                  {p.venue && !p.venue.startsWith('TODO') && <> · {p.venue}</>}
                  {' '}<span className="italic">({p.status})</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{p.abstract}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {visibleReports.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold">Technical Reports</h2>
          <div className="mt-6 space-y-5">
            {visibleReports.map((r, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline gap-4">
                  {r.link
                    ? <a href={r.link} className="font-semibold text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{r.title}</a>
                    : <span className="font-semibold">{r.title}</span>
                  }
                  <span className="text-sm text-gray-500 shrink-0">{r.year}</span>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {r.authors.join(', ')}
                  {r.supervisor && <> · supervised by {r.supervisor}</>}
                  {r.institution && <>, {r.institution}</>}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{r.abstract}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {visibleTheses.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold">Theses</h2>
          <div className="mt-6 space-y-5">
            {visibleTheses.map((t, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline gap-4">
                  {t.link
                    ? <a href={t.link} className="font-semibold text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{t.title}</a>
                    : <span className="font-semibold">{t.title}</span>
                  }
                  <span className="text-sm text-gray-500 shrink-0">{t.year}</span>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {t.degree} · {t.university}
                  {t.supervisor && !t.supervisor.startsWith('TODO') && <> · supervised by {t.supervisor}</>}
                  {t.company && <>, {t.company}</>}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{t.abstract}</p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
