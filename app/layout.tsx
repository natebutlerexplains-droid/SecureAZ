import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SECURAZ - AI Security Audit for Azure",
  description: "AI-powered security audit and compliance dashboard for Microsoft Azure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
