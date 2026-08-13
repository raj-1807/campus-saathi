import './globals.css';
import Navbar from '@/components/Navbar/Navbar';

export const metadata = {
  title: 'Campus Saathi — Your AI Campus Companion',
  description:
    'Ask questions about admissions, courses, facilities, events, and more. Campus Saathi is your AI-powered campus assistant.',
  keywords: ['campus', 'AI', 'chatbot', 'college', 'university', 'admissions', 'RAG'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        <main style={{ paddingTop: 'var(--navbar-height)' }}>{children}</main>
      </body>
    </html>
  );
}
