import "./globals.css";

export const metadata = {
  title: "habitspace solo — one habit, built to last",
  description:
    "Build one habit at a time. Start impossibly small, level up through consistency, and graduate when you've mastered it. Then pick the next one.",
  openGraph: {
    title: "habitspace solo",
    description: "One habit at a time. Built to last.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
