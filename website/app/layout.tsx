import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aleksandr Sergeev',
  description: 'Personal website of Aleksandr Sergeev — R&D Engineer, MSc in Informatics',
};

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/cv', label: 'CV' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <nav className="border-b px-6 py-3 flex gap-6 text-sm font-medium">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-blue-600 transition-colors">
              {label}
            </Link>
          ))}
        </nav>
        <main className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
