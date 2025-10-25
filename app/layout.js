import '../styles/globals.css';

export const metadata = {
  title: 'Agentic App',
  description: 'Deployed to Vercel by an autonomous agent'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
