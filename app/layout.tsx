import { GeistSans } from "geist/font/sans";
import "./globals.css";
import React from "react";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
          <div className="relative flex h-screen flex-col">
            <div className="flex flex-1">
              <main className="container flex justify-center flex-1 py-5">{children}</main>
            </div>
          </div>
      </body>
    </html>
  );
}
