import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCPHub — Discover Open-Source MCP Servers",
  description: "Browse and search curated open-source MCP servers for the Model Context Protocol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-gray-950">
        <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto flex max-w-6xl items-center px-4 py-4">
            <span className="font-mono text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              MCP<span className="text-blue-600 dark:text-blue-400">Hub</span>
            </span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 py-6 dark:border-gray-800">
          <p className="text-center text-xs text-gray-400 dark:text-gray-600">
            MCPHub — A curated directory of open-source MCP servers
          </p>
        </footer>
      </body>
    </html>
  );
}
