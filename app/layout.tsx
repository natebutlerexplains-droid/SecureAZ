import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SECURAZ — Security Dashboard",
  description: "Enterprise security dashboard with threat intelligence, compliance tracking, and AI-powered risk assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
