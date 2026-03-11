import "./globals.css";

export const metadata = {
  title: "habitspace — Build the identity you want. One habit at a time.",
  description:
    "Based on Atomic Habits. Start impossibly small. Stack habits. Build identity-based habits with social accountability through groups. Free to use.",
  openGraph: {
    title: "habitspace",
    description: "Build the identity you want. One habit at a time.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
