import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EdgeDB_Vercel } from "@/components/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EdgeDB + Next.js AI Template",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <EdgeDB_Vercel />
          <a className='contents' href='https://github.com/edgedb/nextjs-edgedb-ai-basic-template' target='_blank' rel="noopener noreferrer">
            <img src="/github.png" alt="GitHub" className="h-6 block hover:scale-105 transform transition duration-300 ease-in-out" />
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
