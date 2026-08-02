import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevGrid | Ultimate GraphQL Mastery Tutorial & Interactive Lab",
  description: "Comprehensive full-stack interactive GraphQL tutorial powered by Next.js 15, Apollo Client, Spring Boot GraphQL server, and PostgreSQL. Demonstrates N+1 DataLoader batching, polymorphic unions, and normalized caching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen selection:bg-pink-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
