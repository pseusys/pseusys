const CV_BASE = 'https://github.com/pseusys/pseusys/releases/download/curriculum-vitae';

const CV_PROFILES = [
  { slug: 'research',      label: 'Research' },
  { slug: 'cryptography',  label: 'Cryptography' },
  { slug: 'networking',    label: 'Networking' },
  { slug: 'all',           label: 'General' },
  { slug: 'frontend',      label: 'Frontend' },
  { slug: 'backend',       label: 'Backend' },
  { slug: 'devops',        label: 'DevOps' },
];

export default function CV() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Curriculum Vitae</h1>
      <p className="mt-2 text-gray-600">
        CVs are generated automatically from source data and published as GitHub release artifacts.
      </p>
      <ul className="mt-6 space-y-2">
        {CV_PROFILES.map(({ slug, label }) => (
          <li key={slug}>
            <a
              href={`${CV_BASE}/${slug}.pdf`}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label} CV
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
